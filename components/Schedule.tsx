import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { View, Text } from 'react-native'

interface User {
    id: string
    firstName: string
    lastName: string
    appointments: Appointment[]
    Medications: Medication[]
}

interface Appointment {
    doctor: string
    dateTime: string
    location: {
        _longitude: number
        _latitude: number
    }
}

interface Medication {
    name: string
    doage: number
    useage: string
}


const FETCH_USER_DATA = gql`
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
  	Medications {
      name
      dosage
      usage
    }
    }
  }
`

const Scheddule = () => {
    const id = '5Q51dzWbvSTuTLXMsMrjCSdgXXu1'
    const { loading, error, data } = useQuery(FETCH_USER_DATA, { fetchPolicy: 'no-cache', variables: { id } })

    if (loading) return <Text>...Loading</Text>
    if (error) {
        console.log(data)
        console.log(JSON.stringify(error))
        return <Text>Error! {error.message}</Text>
    }
    return (
        <View>
            <Text>{data.user.firstName} {data.user.lastName}</Text>
            {data.user.appointments.map((appt: Appointment, index: number) => (
                <React.Fragment key={index}>
                    <Text>{appt.doctor}</Text>
                    <Text>{appt.dateTime}</Text>
                    <Text>{appt.location._longitude}</Text>
                    <Text>{appt.location._latitude}</Text>
                </React.Fragment>
            ))}
        </View>
    )
}

export default Scheddule
