import React, { Component } from 'react';
import {connect} from 'react-redux';
import {agregarProducto} from '../actions/productosActions';

class NuevoProducto extends Component {

    constructor(props){
        super(props);

        this.state = {
            error :false
        };

        this.nombreRef = React.createRef();
        this.precioRef = React.createRef();
    }

    nuevoProducto = (e)=>{
        e.preventDefault();
        
        const nombre = this.nombreRef.current.value;
        const precio = this.precioRef.current.value;

        if(nombre === '' || precio === ''){
            this.setState({
                error : true
            });
            return;
        }
        this.setState({
            error : false
        });
        const producto = {
            nombre,precio
        }
        this.props.agregarProducto(producto);
        this.props.history.push('/');
    }    

    render() {
        const {error} = this.state;
        return (
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Agregar Nuevo Producto</h2>
                            <form onSubmit={this.nuevoProducto}>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" placeholder="Nombre" ref={this.nombreRef}/>
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input type="text" className="form-control" placeholder="Precio" ref={this.precioRef}/>
                                </div>
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                            </form>
                            {error? <div className="font-weight-bold alert alert-danger mt-4">
                                    Todos los campos son obligatorios
                                </div>
                                :''
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {agregarProducto})(NuevoProducto);