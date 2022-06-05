import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Item(props: {title: string; onPress: () => void}) {
  return (
    <Pressable style={styles.item} onPress={props.onPress}>
      <Text style={styles.bold}>{props.title}</Text>
      <Icon size={18} name="chevron-right" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    paddingHorizontal: 20,
    height: 65,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  bold: {
    fontWeight: 'bold',
    width: '85%',
  },
});
