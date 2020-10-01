import React from "react";
import { Card } from "react-bootstrap";

import api from '../../services/api';

// await api.port('posts', { post_id, title, description, status });

class Tabela extends React.Component {

  state = { posts: [] };



  async componentDidMount() {

    const limit = 10;
    const page = 0;
    const response = await api.get(`posts?limit=${limit}&page=${page}`);

    console.log( response.data.rows );

    this.setState({ posts: response.data.rows });



  }

  render() {

    const { posts } = this.state;

    return (<>



      <Card style={{ width: '100%' }}>
        <Card.Body>
            {/* aqi vem o titulo */}
          <Card.Header>
              <h2>Tabela</h2>
            </Card.Header>
            {/* aqui o corpo da tabela */}
          <Card.Text>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">#Id</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Anunciante</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Status</th>
                        <th scope="col">Likes</th>

                    </tr>
                </thead>
                <tbody>
                  
                  {posts.map(post => (
                    <>

                    <tr key={post.id}>
                    <td >{post.post_id}</td>
                    <td >{post.title}</td>
                    <td >{post.description}</td>
                    <td >{post.user.name} {post.user.surname}</td>
                    <td >{post.place.place_name}</td>
                    <td >{post.status}</td>
                    <td >{post.likes}</td>
                    </tr>

                    </>

                  ))}







                </tbody>
            </table>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default Tabela;
