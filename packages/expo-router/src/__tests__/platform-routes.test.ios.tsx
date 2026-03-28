import { Platform } from 'react-native';

import { getRoutes } from '../getRoutes';
import { inMemoryContext } from '../testing-library/context-stubs';

// This test runs in an iOS environment to follow the platform extensions for iOS and TV.

it(`should only load android and native routes`, () => {
  expect(
    getRoutes(
      inMemoryContext({
        './(app)/index': () => null,
        './(app)/page.ts': () => null,
        './(app)/page.web.ts': () => null,
        './(app)/page2.ts': () => null,
        './(app)/page2.native.ts': () => null,
        './(app)/page3.ts': () => null,
        './(app)/page3.android.ts': () => null,
        './(app)/page4.ts': () => null,
        './(app)/page4.ios.ts': () => null,
      }),
      { internal_stripLoadRoute: true, platform: Platform.OS, skipGenerated: true }
    )
  ).toEqual({
    children: [
      {
        children: [],
        contextKey: './(app)/index.js',
        dynamic: null,
        entryPoints: ['expo-router/build/views/Navigator.js', './(app)/index.js'],
        route: '(app)/index',
        type: 'route',
      },
      {
        children: [],
        contextKey: './(app)/page.ts',
        dynamic: null,
        entryPoints: ['expo-router/build/views/Navigator.js', './(app)/page.ts'],
        route: '(app)/page',
        type: 'route',
      },
      {
        children: [],
        contextKey: './(app)/page2.native.ts',
        dynamic: null,
        entryPoints: ['expo-router/build/views/Navigator.js', './(app)/page2.native.ts'],
        route: '(app)/page2',
        type: 'route',
      },
      {
        children: [],
        contextKey: './(app)/page3.ts',
        dynamic: null,
        entryPoints: ['expo-router/build/views/Navigator.js', './(app)/page3.ts'],
        route: '(app)/page3',
        type: 'route',
      },
      {
        children: [],
        contextKey: './(app)/page4.ios.ts',
        dynamic: null,
        entryPoints: ['expo-router/build/views/Navigator.js', './(app)/page4.ios.ts'],
        route: '(app)/page4',
        type: 'route',
      },
    ],
    contextKey: 'expo-router/build/views/Navigator.js',
    dynamic: null,
    generated: true,
    route: '',
    type: 'layout',
  });
});

it(`should work with layout routes`, () => {
  expect(
    getRoutes(
      inMemoryContext({
        './(app)/index.tsx': () => null,
        './(app)/_layout.tsx': () => null,
        './(app)/_layout.ios.tsx': () => null,
      }),
      { internal_stripLoadRoute: true, platform: Platform.OS, skipGenerated: true }
    )
  ).toEqual({
    children: [
      {
        children: [
          {
            children: [],
            contextKey: './(app)/index.tsx',
            dynamic: null,
            entryPoints: [
              'expo-router/build/views/Navigator.js',
              './(app)/_layout.ios.tsx',
              './(app)/index.tsx',
            ],
            route: 'index',
            type: 'route',
          },
        ],
        contextKey: './(app)/_layout.ios.tsx',
        dynamic: null,
        initialRouteName: undefined,
        route: '(app)',
        type: 'layout',
      },
    ],
    contextKey: 'expo-router/build/views/Navigator.js',
    dynamic: null,
    generated: true,
    route: '',
    type: 'layout',
  });
});

// Verify that the platform expression used in router-store.tsx
// (Platform.isTV ? 'tv' : Platform.OS) resolves .tv routes over .ios
// when running on a tvOS device (Platform.OS = 'ios', Platform.isTV = true).
it(`should resolve tv routes over ios routes when platform is 'tv'`, () => {
  expect(
    getRoutes(
      inMemoryContext({
        './(app)/index': () => null,
        './(app)/page.ts': () => null,
        './(app)/page.ios.ts': () => null,
        './(app)/page.tv.ts': () => null,
      }),
      { internal_stripLoadRoute: true, platform: 'tv', skipGenerated: true }
    )
  ).toEqual({
    children: [
      {
        children: [],
        contextKey: './(app)/index.js',
        dynamic: null,
        entryPoints: ['expo-router/build/views/Navigator.js', './(app)/index.js'],
        route: '(app)/index',
        type: 'route',
      },
      {
        children: [],
        contextKey: './(app)/page.tv.ts',
        dynamic: null,
        entryPoints: ['expo-router/build/views/Navigator.js', './(app)/page.tv.ts'],
        route: '(app)/page',
        type: 'route',
      },
    ],
    contextKey: 'expo-router/build/views/Navigator.js',
    dynamic: null,
    generated: true,
    route: '',
    type: 'layout',
  });
});
