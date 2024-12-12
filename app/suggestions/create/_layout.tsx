import { Stack } from 'expo-router';
import { CreateSuggestionProvider } from '../../../contexts/CreateSuggestionContext';

export default function CreateLayout() {
  return (
    <CreateSuggestionProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Create Suggestion',
            headerShown: true,
          }}
        />
      </Stack>
    </CreateSuggestionProvider>
  );
} 