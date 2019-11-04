import React from 'react';
import { ScreenContainer, Screen } from 'react-native-screens';
import {
  usePager,
  FocusProvider,
  IndexProvider,
} from '@crowdlinker/react-native-pager';
import { useNavigator } from './navigator';
import { BasepathProvider } from './history';
import { StyleSheet } from 'react-native';
import { AccessibleScreen } from './accessible-screen';

interface iSwitch {
  children: any;
}

function Switch({ children }: iSwitch) {
  const [activeIndex] = usePager();
  const navigator = useNavigator();

  return (
    <ScreenContainer style={{ flex: 1 }}>
      {React.Children.map(children, (child: any, index: number) => {
        const route = navigator.routes[index];
        const active = activeIndex === index ? 1 : 0;

        if (route !== undefined) {
          return (
            <Screen active={active} style={StyleSheet.absoluteFill}>
              <BasepathProvider value={route}>
                <FocusProvider focused={index === activeIndex}>
                  <IndexProvider index={index}>
                    <AccessibleScreen>{child}</AccessibleScreen>
                  </IndexProvider>
                </FocusProvider>
              </BasepathProvider>
            </Screen>
          );
        }

        return (
          <Screen active={active} style={StyleSheet.absoluteFill}>
            <FocusProvider focused={index === activeIndex}>
              <IndexProvider index={index}>
                <AccessibleScreen>{child}</AccessibleScreen>
              </IndexProvider>
            </FocusProvider>
          </Screen>
        );
      })}
    </ScreenContainer>
  );
}

export { Switch };
