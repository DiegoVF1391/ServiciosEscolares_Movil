import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const HomeScreen = ({navigation, route}) => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.welcome}>¡Bienvenido {userInfo.user.name}!</Text>
      
      <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Solicitudes');
      }}>
      <View style={styles.mainCardView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: "#030303",
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              Ver Solicitudes de Usuario
            </Text>
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                width: '85%',
              }}>
              <Text
                style={{
                  color: "#919191",
                  fontSize: 12,
                }}>
                Permite mostrar las solicitudes del usuario que haya hecho
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>

    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Bitacoras');
    }}>
      <View style={styles.mainCardView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: "#030303",
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              Ver Bitacoras de Usuario
            </Text>
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                width: '85%',
              }}>
              <Text
                style={{
                  color: "#919191",
                  fontSize: 12,
                }}>
                Permite mostrar las bitacoras del usuario que haya hecho
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>

    <Button title="Salir de la sesión" style={styles.boton} onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
  boton: {
    position: 'absolute',
    bottom:0,
    left:0,
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DEDEDE',
    borderRadius: 15,
    shadowColor: "#9E9E9E",
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#DEDEDE",
    borderColor: "#999999",
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
