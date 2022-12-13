import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';

const SolicitudesScreen = ({navigation, route}) => {
  const {userInfo, isLoading} = useContext(AuthContext);
  const [servicios, setServicios] = useState({});

  const getServicios = () => {
    axios
      .get(`${BASE_URL}/servicios`, {
        headers: {Authorization: `Bearer ${userInfo.access_token}`},
      })
      .then(res => {
        console.log(res.data);
        setServicios(res.data);
      })
      .catch(e => {
        console.log(`Error al obtener solicitudes de servicios ${e.message}`);
      });
  };

  useEffect(() => {
    getServicios();
  }, [route.params?.servicio]);

  if(Object.keys(servicios).length == 0){
    return(
        <View style={styles.container}>
            <Spinner visible={isLoading} />
              <Text style={styles.welcome}>No tienes ninguna solicitud asignada</Text>
              <Button title="Crear nueva solicitud" onPress={() => {navigation.navigate('Crear Solicitud');}} />
        </View>
    );
  }
  else{
	return (
        <SafeAreaView>
            <ScrollView>
            <View style={styles.container}>
          <Spinner visible={isLoading} />
          <Button title="Crear nueva solicitud" onPress={() => {navigation.navigate("Crear Solicitud");}} />
          <FlatList
            data={servicios}
            renderItem={({item}) => {
              return (
                <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Mostrar Solicitudes', {servicio: item});
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
                        {item.nombre}
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
                            fontWeight: 'bold',
                            fontSize: 12,
                          }}>
                          Estado: {item.estado}
                        </Text>
                      </View>
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

export default SolicitudesScreen;
