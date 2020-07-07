import React, { Component } from 'react';
import {connect} from 'react-redux';
import {editarProducto,mostrarProducto} from '../actions/productosActions';

class EditarProducto extends Component {
    constructor(props){
        super(props);

        this.state = {
            error :false
        };

        this.nombreRef = React.createRef();
        this.precioRef = React.createRef();
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.mostrarProducto(id);
    }

    componentWillReceiveProps(nextProps) {
        const {nombre,precio} = nextProps.producto;
        this.nombreRef.current.value = nombre;
        this.precioRef.current.value = precio;
    }

    actualizarProducto = (e)=>{
        e.preventDefault();
        
        const nombre = this.nombreRef.current.value;
        const precio = this.precioRef.current.value;
        const {id} = this.props.match.params;

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
            id,nombre,precio
        }
        this.props.editarProducto(producto);
        this.props.history.push('/');
    }    

    render() {
        const {error} = this.state;
        return (
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Editar Producto</h2>
                            <form onSubmit={this.actualizarProducto}>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" placeholder="Nombre" ref={this.nombreRef}/>
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input type="text" className="form-control" placeholder="Precio" ref={this.precioRef}/>
                                </div>
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
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

const mapStateToProps= (state)=> {
    return{
        producto:state.productos.producto
    }
}

export default connect(mapStateToProps, {editarProducto,mostrarProducto})(EditarProducto);