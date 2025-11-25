import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Buffer } from 'buffer';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

import { ThemeProvider } from './screens/ThemeContext';
import { ExpenseProvider } from './services/expenseContext';
import { LanguageProvider } from './services/languageContext';
global.Buffer = Buffer;

// Screens
import AddExpenseScreen from './screens/AddExpenseScreen';
import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/LearnScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RewardsScreen from './screens/RewardsScreen';
import SignupScreen from './screens/SignupScreen';
import SplashScreen from './screens/SplashScreen';
import ToolsScreen from './screens/ToolsScreen';
import TwoFactorAuthScreen from './screens/TwoFactorAuthScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ToolsStack = createNativeStackNavigator();
const RewardsStack = createNativeStackNavigator();
const LearnStack = createNativeStackNavigator();

// --- Nested Stacks --- //

// Tools Nested Stack
// Tools Nested Stack
function ToolsStackScreen() {
  return (
    <ToolsStack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="ToolsMain"
    >
      <ToolsStack.Screen name="ToolsMain" component={ToolsScreen} />
      <ToolsStack.Screen 
        name="Expense" 
        component={ToolsScreen} 
        initialParams={{ screen: 'expense' }} 
      />
      <ToolsStack.Screen 
        name="Investment" 
        component={ToolsScreen} 
        initialParams={{ screen: 'investment' }} 
      />
      <ToolsStack.Screen 
        name="Savings" 
        component={ToolsScreen} 
        initialParams={{ screen: 'savings' }} 
      />
      <ToolsStack.Screen 
        name="Goals" 
        component={ToolsScreen} 
        initialParams={{ screen: 'goals' }} 
      />
      <ToolsStack.Screen 
        name="Fraud" 
        component={ToolsScreen} 
        initialParams={{ screen: 'fraud' }} 
      />
    </ToolsStack.Navigator>
  );
}

// Rewards Nested Stack
function RewardsStackScreen() {
  return (
    <RewardsStack.Navigator screenOptions={{ headerShown: false }}>
      <RewardsStack.Screen name="RewardsMain" component={RewardsScreen} />
      <RewardsStack.Screen name="Leaderboard" component={RewardsScreen} />
    </RewardsStack.Navigator>
  );
}

// Learn Nested Stack
function LearnStackScreen() {
  return (
    <LearnStack.Navigator screenOptions={{ headerShown: false }}>
      <LearnStack.Screen name="LearnMain" component={LearnScreen} />
      <LearnStack.Screen name="Tutorials" component={LearnScreen} />
      <LearnStack.Screen name="Knowledge" component={LearnScreen} />
    </LearnStack.Navigator>
  );
}

// --- Bottom Tabs Navigator --- //
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home-outline';
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Tools':
              iconName = focused ? 'construct' : 'construct-outline';
              break;
            case 'Learn':
              iconName = focused ? 'school' : 'school-outline';
              break;
            case 'Rewards':
              iconName = focused ? 'trophy' : 'trophy-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { height: 60, paddingTop: 8, paddingBottom: 6 },
        tabBarItemStyle: { marginTop: 4 },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tools" component={ToolsStackScreen} />
      <Tab.Screen name="Learn" component={LearnStackScreen} />
      <Tab.Screen name="Rewards" component={RewardsStackScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// --- Root Stack Navigator --- //
function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="TwoFactorAuth" component={TwoFactorAuthScreen} />
      <Stack.Screen name="HomeTabs" component={MainTabs} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
    </Stack.Navigator>
  );
}

// --- Helper: Navigate to nested tools --- //
export function navigateToTool(navigation: any, toolName: string) {
  navigation.navigate('Tools', { screen: toolName });
}

// --- Reset to Home Function --- //
export function resetToHome(navigation: any) {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'HomeTabs' }],
    })
  );
}

// --- Main App Component --- //
export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider>
          <LanguageProvider>
            <ExpenseProvider>
              <NavigationContainer>
                <RootStack />
              </NavigationContainer>
              <Toaster />
            </ExpenseProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, userSelect: 'none' },
});
