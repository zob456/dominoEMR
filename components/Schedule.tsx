import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { View, Text } from 'react-native'
import { fontStyles, scheduleStyles } from '../styles/index'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
//@ts-ignore
import { mapsK } from '@env'


interface Appointment {
    doctor: string
    dateTime: string
    location: {
        _longitude: number
        _latitude: number
    }
}


const FETCH_APPT_DATA = gql`
    query User($id: String!) {
    user(id: $id) {
    firstName
    lastName
    appointments {
      doctor
      dateTime
      location {
        _latitude
        _longitude
      }    
    }
    }
  }
`

const Scheddule = () => {

    const maps = (lat: number, long: number) => {
        return `https://www.google.com/maps/embed/v1/place
        ?key=${mapsK}&location=${lat},${long}&zoom=18`
    }

    const id = '5Q51dzWbvSTuTLXMsMrjCSdgXXu1'
    const { loading, error, data } = useQuery(FETCH_APPT_DATA, { fetchPolicy: 'no-cache', variables: { id } })

    if (loading) return <Text>...Loading</Text>
    if (error) {
        return <Text>Error! {error.message}</Text>
    }

    const formattedDate = (date: any) => new Date(date).toLocaleDateString()

    return (
        <View style={scheduleStyles.container} >
            {data.user.appointments.map((appt: Appointment, index: number) => (
                <React.Fragment key={index}>
                    <Text style={fontStyles.listHdrFont}> Date of Appt: {formattedDate(parseInt(appt.dateTime))}</Text>
                    <Text style={{ paddingLeft: 20 }}>
                        <Text style={fontStyles.labelFont}>
                            Doctor:
                    </Text>
                        <Text style={fontStyles.strdFont}>{appt.doctor}</Text>
                    </Text>
                    <Text style={{ paddingLeft: 20 }}>
                        <MapView
                            style={{
                                height: 150, width: 200, position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                            provider={PROVIDER_GOOGLE}
                            region={{
                                latitude: appt.location._latitude,
                                longitude: appt.location._longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: appt.location._latitude,
                                    longitude: appt.location._longitude,
                                }}
                            />
                        </MapView>
                    </Text>
                </React.Fragment>
            ))}
        </View>
    )
}

export default Scheddule
