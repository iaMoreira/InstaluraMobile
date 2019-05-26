import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';

const width = Dimensions.get('screen').width;

type Props = {};
export default class Post extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.foto,
      valorComentario: ''
    }
  }
  carregaIcone(likeada) {
    return !likeada ? require('../../resources/img/s2.png') :
      require('../../resources/img/s2-checked.png')
  }

  exibeLegenda(foto) {
    if (foto.comentario == '')
      return;

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    );
  }

  exibeLikes(likers) {
    if (likers.length <= 0)
      return;

    return <Text style={styles.likes}>{likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}</Text>
  }

  like() {

    const { foto } = this.state;
    let novaLista = [];
    if (!foto.likeada) {
      novaLista = [
        ...foto.likers,
        { login: 'Ian' }
      ]
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'Ian'
      })
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }
    this.setState({ foto: fotoAtualizada })
  }

  addComentario() {
    const { foto , valorComentario, inputComentario} = this.state;


    if(valorComentario === '')
      return;
    const novaLista = [...foto.comentarios, {
      id: valorComentario,
      login: 'Ian',
      texto: valorComentario,

    }];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }

    this.setState({foto:fotoAtualizada, valorComentario: ''});
    this.inputComentario.clear();
  }

  render() {
    const { foto } = this.state;
    return (

      <View >
        <View style={styles.header}>
          <Image source={{ uri: foto.urlPerfil }}
            style={styles.photoPerfil} />
          <Text >{foto.loginUsuario}</Text>
        </View>
        <Image source={{ uri: foto.urlFoto }}
          style={styles.photoPost} />
        <View style={styles.rodape}>
          <TouchableOpacity onPress={this.like.bind(this)}>
            <Image style={styles.botaoDeLike} source={this.carregaIcone(foto.likeada)} />
          </TouchableOpacity>
          {this.exibeLikes(foto.likers)}
          {this.exibeLegenda(foto)}
          {foto.comentarios.map(comentario =>
            <View style={styles.comentario} key={comentario.id}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          )}
          <View style={styles.novoComentario}>
            <TextInput style={styles.input}
              placeholder="Adicione um comentário..."
              ref={input => this.inputComentario = input}
              onChangeText={texto => this.setState({valorComentario: texto})} />
            <TouchableOpacity onPress={this.addComentario.bind(this)}>
              <Image style={styles.icone} source={require('../../resources/img/send.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      /* <ScrollView style={{ marginTop: 20 }}>
          {fotos.map(foto =>
          <View key={foto.id}>
              <Text >{foto.usuario}</Text>
              <Image source={require('./resources/img/sufer2.jpg')}
              style={{ width: width, height: width }} />
          </View>
          )}
      </ScrollView> */
    );
  }
}

const styles = StyleSheet.create({
  header: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  photoPerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  photoPost: {
    width: width,
    height: width
  },
  botaoDeLike: {
    marginBottom: 10,
    width: 40,
    height: 40
  },
  rodape: {
    margin: 10
  },
  likes: {
    fontWeight: 'bold'
  },
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icone: {
    width: 30,
    height: 30
  },
  input: {
    flex: 1,
    height: 40
  }
});

