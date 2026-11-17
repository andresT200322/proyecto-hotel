import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = { username: '', password: '' };
  loginMensaje = '';

  registroData = { nombre: '', email: '', telefono: '', username: '', password: '' };
  registroMensaje = '';

  constructor(
    private loginService: LoginService,
    private clientesService: ClientesService
  ) {}

  soloNumeros(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 10);
    this.registroData.telefono = input.value;
  }

  private mostrarError(titulo: string, mensaje: string) {
    let timerInterval: any;
    Swal.fire({
      icon: 'error',
      title: titulo,
      html: `${mensaje}<br>Cerrando en <b></b> ms.`,
      timer: 7000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()?.querySelector('b');
        timerInterval = setInterval(() => {
          if (timer) {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('Cerrado por el temporizador');
      }
    });
  }

  private mostrarExito(titulo: string, mensaje: string) {
    let timerInterval: any;
    Swal.fire({
      title: titulo,
      html: `${mensaje}<br>Cerrando en <b></b> ms.`,
      timer: 7000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()?.querySelector('b');
        timerInterval = setInterval(() => {
          if (timer) {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('Cerrado por el temporizador');
      }
    });
  }

  iniciarSesion() {
    this.loginMensaje = '';

    const { username, password } = this.loginData;
    if (!username.trim() || !password.trim()) {
      this.mostrarError('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (password.length < 4 || password.length > 20) {
      this.mostrarError('Contraseña inválida', 'La contraseña debe tener entre 4 y 20 caracteres');
      return;
    }

    this.loginService.login(this.loginData).subscribe({
      next: (res) => {
        this.loginMensaje = res?.mensaje || 'Login exitoso';
        this.mostrarExito('Inicio de sesión exitoso!', 'Muy bien.');
      },
      error: (err) => {
        const msg = err?.error?.mensaje || 'Error al iniciar sesión';
        this.mostrarError('Error al iniciar sesión', msg);
      },
    });
  }

  registrar() {
    this.registroMensaje = '';

    const { nombre, email, telefono, username, password } = this.registroData;
    if (!nombre.trim() || !email.trim() || !telefono.trim() || !username.trim() || !password.trim()) {
      this.mostrarError('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+$/.test(email)) {
      this.mostrarError('Correo inválido', 'El correo debe tener el formato texto@texto');
      return;
    }
    if (!/^\d{10}$/.test(telefono)) {
      this.mostrarError('Teléfono inválido', 'El teléfono debe tener exactamente 10 números');
      return;
    }
    if (password.length < 4 || password.length > 20) {
      this.mostrarError('Contraseña inválida', 'La contraseña debe tener entre 4 y 20 caracteres');
      return;
    }

    this.clientesService.crearCliente(this.registroData).subscribe({
      next: (res) => {
        this.registroMensaje = res?.mensaje || 'Usuario registrado';
        this.registroData = { nombre: '', email: '', telefono: '', username: '', password: '' };
        this.mostrarExito('Registro exitoso!', 'Muy bien.');
      },
      error: (err) => {
        const msg = err?.error?.mensaje || 'Error al registrar';
        this.mostrarError('Error al registrarse', msg);
      },
    });
  }
}