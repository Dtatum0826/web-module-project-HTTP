import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';


export default function AddMovieForm(props) {
const{setMovies} =props
const navigate = useNavigate()
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        genre: "",
        metascore: 0,
        description: ""
    });

    const {id} = useParams()
  const [movieid, setMovieId] = useState('')

  useEffect(()=>{
    setMovieId(id)
    },[id])
    

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        axios.post('http://localhost:9000/api/movies', movie)
            .then(res => {
                console.log(res)
                setMovie({
                    title: "",
                    director: "",
                    genre: "",
                    metascore: 0,
                    description: ""
                })
                setMovies(res.data)
                navigate(`/movies`)
            })
            .catch(err => {
                console.error(err)
            })
    }



    return (
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="title">Title</label>
                <input type="text" name="title" value={movie.title} onChange={handleChange} />
                <br />
                <label htmlFor="director">Director</label>
                <input type="text" name="director" value={movie.director} onChange={handleChange} />
                <br />
                <label htmlFor="genre">Genre</label>
                <input type="text" name="genre" value={movie.genre} onChange={handleChange} />
                <br />
                <label htmlFor="metascore">Metascore</label>
                <input type="number" name="metascore" value={movie.metascore} onChange={handleChange} />
                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={movie.description} onChange={handleChange} /> */}
                <div className="modal-header">
                    <h4 className="modal-title">Add New Movie <strong>{movie.title}</strong></h4>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Title</label>
                        <input value={movie.title} onChange={handleChange} name="title" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Director</label>
                        <input value={movie.director} onChange={handleChange} name="director" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input value={movie.genre} onChange={handleChange} name="genre" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Metascore</label>
                        <input value={movie.metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea value={movie.description} onChange={handleChange} name="description" className="form-control"></textarea>
                    </div>
                </div>
                <div className="modal-footer">
            <input type="submit" className="btn btn-info" value="Add" />
            <Link to={`/movies/${movieid}`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
          </div>


            </form>
        </div>
    )
}
