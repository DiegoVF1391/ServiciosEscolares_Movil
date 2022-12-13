import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';

const BitacorasScreen = ({navigation, route}) => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);
  const [bitacoras, setBitacoras] = useState({});

  const getBitacoras = () => {
    axios
      .get(`${BASE_URL}/bitacoras`, {
        headers: {Authorization: `Bearer ${userInfo.access_token}`},
      })
      .then(res => {
        console.log(res.data);
        setBitacoras(res.data);
      })
      .catch(e => {
        console.log(`Error al obtener solicitudes de servicios ${e.message}`);
      });
  };

  useEffect(() => {
    getBitacoras();
  }, [route.params?.bitacoras]);
  
  if(Object.keys(bitacoras).length == 0){
    return(
	<View style={styles.container}>
		<Spinner visible={isLoading} />
      	<Text style={styles.welcome}>No tienes ninguna bitacora registrada</Text>
    </View>
    );
  }
  else{
	return (
        <SafeAreaView>
            <ScrollView>
            <View style={styles.container}>
          <Spinner visible={isLoading} />
          <Text style={styles.welcome}>Bitacoras</Text>
          <FlatList
            data={bitacoras}
            renderItem={({item}) => {
              return (
                <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Mostrar Bitacoras');
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
                        {item.actividad}
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
                          Descripción: {item.descripcion}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
        <Button title="Crear nueva bitacora" onPress={console.log("Nueva bitacora")} />
            </ScrollView>
        </SafeAreaView>
      );
  }
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
    paddingTop: 50,
    paddingBottom: 50,
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

export default BitacorasScreen;
