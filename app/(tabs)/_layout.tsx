import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

/**
 * Defines the main tab navigation layout for the application.
 *
 * The tab bar has a custom style with primary color for active tabs and white color for inactive tabs.
 * It includes five tabs: Home, Calendar, Create, Notifications, and Profile - each with their respective
 * Ionicons icon.
 *
 * The tab bar is positioned absolutely with a height of 50px, no top border, and custom shadow effects.
 *
 * @returns A Tabs navigation component with configured screens for the main application flow.
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.white,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopWidth: 0,
          elevation: 0,
          shadowOffset: { width: 10, height: 10 },
          position: "absolute",
          height: 50,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          title: "Calendar",
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="add-circle" size={size} color={COLORS.primary} />
          ),
          title: "Create",
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
          title: "Notifications",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
