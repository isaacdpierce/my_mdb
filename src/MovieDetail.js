import React, { Component } from "react";
import styled from "styled-components";
import { Poster } from "./Movie.js";
import Overdrive from "react-overdrive";

const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
const BACKDROP_PATH = "http://image.tmdb.org/t/p/w1280";

class MovieDetail extends Component {
  state = {
    movie: {}
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=6b076fbdffa550b532e9be37f511efe5&language=en-US`
      );
      const movie = await res.json();
      this.setState({
        movie: movie
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster
              src={`${POSTER_PATH}${movie.poster_path}`}
              alt={movie.title}
            />
          </Overdrive>
          <div>
            <h3>{movie.title}</h3>
            <h5>{movie.release_date}</h5>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 60vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
  background-position: center;
`;

const MovieInfo = styled.div`
  display: flex;
  background: #222;
  color: #cccccc;
  text-align: left;
  padding: 1rem 10%;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -3.9rem;
  }
`;
