import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = () => {
  const { state, addBlogPost } = useContext(Context)

  return (
    <View>
      <Button title='Add Post' onPress={addBlogPost} />
      <FlatList 
        data={state}
        keyExtractor={blogPosts => blogPosts.titls}
        renderItem={({item}) => {
          return (
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <Feather style={styles.icon} name='trash' />
            </View>
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginLeft:10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey'
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24
  }
});

export default IndexScreen;
