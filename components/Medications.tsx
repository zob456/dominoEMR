import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { View, Text } from 'react-native'
import { fontStyles, medsStyles } from '../styles/index'

interface Medication {
    name: string
    dosage: number
    usage: string
}

const FETCH_MED_DATA = gql`
    query User($id: String!) {
    user(id: $id) {
    firstName
    lastName
  	Medications {
      name
      dosage
      usage
    }
    }
    }
`

const Medications = () => {
    const id = '5Q51dzWbvSTuTLXMsMrjCSdgXXu1'
    const { loading, error, data } = useQuery(FETCH_MED_DATA, { fetchPolicy: 'no-cache', variables: { id } })

    if (loading) return <Text>...Loading</Text>
    if (error) {
        console.log(data)
        return <Text>Error! {error.message}</Text>
    }

    return (
        <View style={medsStyles.container}>
            {data.user.Medications.map((med: Medication, index: number) => (
                <React.Fragment key={index}>
                    <Text style={fontStyles.listHdrFont}>{med.name}</Text>
                    <Text style={{ paddingLeft: 20 }}>
                        <Text style={fontStyles.labelFont}>
                            Dosage:
                    </Text>
                        <Text style={fontStyles.strdFont}>{med.dosage}</Text>
                    </Text>
                    <Text style={{ paddingLeft: 20 }}>
                        <Text style={fontStyles.labelFont}>
                            Usage:
                    </Text>
                        <Text style={fontStyles.strdFont}>{med.usage}</Text>
                    </Text>
                </React.Fragment>
            ))}
        </View>
    )
}

export default Medications
