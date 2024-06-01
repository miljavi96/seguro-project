import { Component, OnInit } from '@angular/core';
import { collection, addDoc, updateDoc, getDoc, Firestore, doc, } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.page.html',
  styleUrls: ['./cliente-edit.page.scss'],
})
export class ClienteEditPage implements OnInit {




  id: any;

  cliente: any = [];

  //private storage: Storage = inject(Storage);
  constructor(private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private rt: Router
  ) { }

  ngOnInit() {
    // this.incluirCliente();
    //this.editarCliente("2BpFVjd1yuhQwrWbRrk2");
    this.route.params.subscribe((params: any) => {
      //console.log('params', params);
      this.id = params.id;
      //console.log('id', this.id);
      if (this.id) {
        this.obtenerCliente(this.id);
      }

    });
  }

  incluirCliente = () => {
    console.log('aqui incluir en firebase');
    let clienteRef = collection(this.firestore, 'clientes');

    addDoc(
      clienteRef,
      {
        nombre_apellido: this.cliente.nombre_apellido,
        fecha_nacimiento: (this.cliente.fecha_nacimiento) ? (new Date(this.cliente.fecha_nacimiento)) : new Date(),
        bien_asegurado: this.cliente.bien_asegurado,
        monto_asegurado: (this.cliente.monto_asegurado) ? (this.cliente.monto_asegurado) : 0
      }

    ).then(doc => {
      console.log('registro incluido');
      this.volver();

    }
    ).catch((error) => {
      console.error("Error: ", error);
    });
  }

  editarCliente = (id: string) => {
    console.log('aqui editar en firebase');
    const document = doc(this.firestore, 'clientes', this.id);

    updateDoc(
      document,
      {
        nombre_apellido: this.cliente.nombre_apellido,
        fecha_nacimiento: (this.cliente.fecha_nacimiento) ? (new Date(this.cliente.fecha_nacimiento)) : new Date(),
        bien_asegurado: this.cliente.bien_asegurado,
        monto_asegurado: (this.cliente.monto_asegurado) ? (this.cliente.monto_asegurado) : 0
      }

    ).then(doc => {
      console.log('registro editado');
      this.volver();

    }
    ).catch((error) => {
      console.error("Error: ", error);
    });
  }

  obtenerCliente = (id: string) => {

    const document = doc(this.firestore, 'clientes', id);

    getDoc(document).then(doc => {
      console.log('registro a editar', doc.data());
      if (doc.data()) {
        this.cliente = doc.data();
        const timestamp = this.cliente.fecha_nacimiento; // Asume que 'fecha' es el campo Timestamp
        this.cliente.fecha_nacimiento = timestamp.toDate().toISOString(); // Convierte a ISO 8601
       
      } else {
        this.cliente = {};
      }


    });
  }

  volver = () => {
    this.rt.navigate(['/cliente-list']);


  }

  accion = (id: string) => {
  
      if (this.id) {
        //console.log("modificar");
        this.editarCliente(this.id);

      } else {
        //console.log("guardar");
        this.incluirCliente();

      }
      this.volver();
    

  }
  
  

}
