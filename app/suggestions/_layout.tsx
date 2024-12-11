import { Tabs } from 'expo-router';

export default function SuggestionsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="list"
        options={{
          title: 'My Suggestions',
          tabBarLabel: 'Suggestions',
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create New',
          tabBarLabel: 'Create',
        }}
      />
    </Tabs>
  );
}
