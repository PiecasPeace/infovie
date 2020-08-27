import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const LeftDrawer = (props: any) => {
    const [isDarkTheme, setDarkTheme] = useState(false)

    const toggleTheme = () => {
        setDarkTheme(!isDarkTheme)
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image source={{
                                uri: "https://static.wikia.nocookie.net/haus-des-geldes/images/a/a4/Professor.jpg/revision/latest/scale-to-width-down/310?cb=20200402194020&path-prefix=de"
                            }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>Sergio Marvana</Title>
                                <Caption style={styles.caption}>@Bruh</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>2.2 Mio</Paragraph>
                                <Caption style={styles.caption}>Follower</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) =>
                                <MaterialCommunityIcons
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            }
                            label="Home"
                            onPress={() => props.navigation.navigate("Home")}
                        />
                        <DrawerItem
                            icon={({ color, size }) =>
                                <MaterialCommunityIcons
                                    name="movie-outline"
                                    color={color}
                                    size={size}
                                />
                            }
                            label="Search Movie"
                            onPress={() => props.navigation.navigate("Details")}
                        />
                        <DrawerItem
                            icon={({ color, size }) =>
                                <MaterialCommunityIcons
                                    name="information-outline"
                                    color={color}
                                    size={size}
                                />
                            }
                            label="About"
                            onPress={() => props.navigation.navigate("About")}
                        />
                        <DrawerItem
                            icon={({ color, size }) =>
                                <MaterialCommunityIcons
                                    name="qrcode-scan"
                                    color={color}
                                    size={size}
                                />
                            }
                            label="Scan a QR-Code"
                            onPress={() => props.navigation.navigate("QR")}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text> Dark Theme </Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.botomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) =>
                        <MaterialCommunityIcons
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    }
                    label="Sign out"
                    onPress={() => "BRUH"}
                />
            </Drawer.Section>

        </View >
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15,
    },
    botomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
})

export default LeftDrawer