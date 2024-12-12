import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { suggestionsApi } from '../api/suggestions';
import type { 
  Session, 
  CreateSessionDto, 
  UpdateSessionDto, 
  SessionResponse,
  SessionsResponse 
} from '@/types/suggestions';

// Query keys
export const suggestionKeys = {
  all: ['suggestions'] as const,
  lists: () => [...suggestionKeys.all, 'list'] as const,
  list: (filters: string) => [...suggestionKeys.lists(), { filters }] as const,
  details: () => [...suggestionKeys.all, 'detail'] as const,
  detail: (id: string) => [...suggestionKeys.details(), id] as const,
};

// Queries
export const useGetSessions = () => {
  return useQuery({
    queryKey: suggestionKeys.lists(),
    queryFn: () => suggestionsApi.getSessions()
  });
};

export const useGetSession = (id: string) => {
  return useQuery({
    queryKey: suggestionKeys.detail(id),
    queryFn: () => suggestionsApi.getSession(id),
    enabled: !!id
  });
};

// Mutations
export const useCreateSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateSessionDto) => suggestionsApi.createSession(data),
    onMutate: async (newSession) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: suggestionKeys.lists() });

      // Get current sessions
      const previousSessions = queryClient.getQueryData<SessionsResponse>(suggestionKeys.lists());

      // Optimistically update sessions list
      if (previousSessions) {
        queryClient.setQueryData<SessionsResponse>(suggestionKeys.lists(), {
          ...previousSessions,
          data: [...previousSessions.data, {
            ...newSession,
            id: 'temp-id-' + Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          } as Session]
        });
      }

      return { previousSessions };
    },
    onError: (err, newSession, context) => {
      // Rollback on error
      if (context?.previousSessions) {
        queryClient.setQueryData(suggestionKeys.lists(), context.previousSessions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: suggestionKeys.lists() });
    }
  });
};

export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSessionDto }) => 
      suggestionsApi.updateSession(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: suggestionKeys.detail(id) });
      
      // Snapshot current session
      const previousSession = queryClient.getQueryData<SessionResponse>(
        suggestionKeys.detail(id)
      );

      // Optimistically update session
      if (previousSession) {
        queryClient.setQueryData<SessionResponse>(suggestionKeys.detail(id), {
          ...previousSession,
          data: {
            ...previousSession.data,
            ...data,
            updatedAt: new Date().toISOString()
          }
        });
      }

      return { previousSession };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousSession) {
        queryClient.setQueryData(
          suggestionKeys.detail(variables.id),
          context.previousSession
        );
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: suggestionKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: suggestionKeys.lists() });
    }
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => suggestionsApi.deleteSession(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: suggestionKeys.lists() });

      // Snapshot current sessions
      const previousSessions = queryClient.getQueryData<SessionsResponse>(suggestionKeys.lists());

      // Optimistically remove session
      if (previousSessions) {
        queryClient.setQueryData<SessionsResponse>(suggestionKeys.lists(), {
          ...previousSessions,
          data: previousSessions.data.filter(session => session.id !== id)
        });
      }

      return { previousSessions };
    },
    onError: (err, id, context) => {
      // Rollback on error
      if (context?.previousSessions) {
        queryClient.setQueryData(suggestionKeys.lists(), context.previousSessions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: suggestionKeys.lists() });
    }
  });
}; 