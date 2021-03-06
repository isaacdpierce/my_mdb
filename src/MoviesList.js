import React, { PureComponent } from "react";
import styled from "styled-components";
import Movie from "./Movie";

class MoviesList extends PureComponent {
  state = {
    movies: []
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=6b076fbdffa550b532e9be37f511efe5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
      );
      const movies = await res.json();
      this.setState({
        movies: movies.results
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <MovieGrid>
        {this.state.movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
  padding: 1rem;
  margin-top: 3rem;
`;
