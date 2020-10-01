import React from "react";
import { Card } from "react-bootstrap";

import api from '../../services/api';

// await api.port('posts', { post_id, title, description, status });

class Tabela extends React.Component {

  state = { posts: [] };

  async componentDidMount() {
    const response = await api.get(`posts`);

    this.setState({ posts: response.data });

    console.log( response.data );

  }

  render() {

    const { posts } = this.state;

    console.log(posts);

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
                    <td >{JSON.stringify(post.place)}</td>
                    <td >{post.status}</td>
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
