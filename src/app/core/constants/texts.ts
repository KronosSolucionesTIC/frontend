import { EMPTY } from "rxjs";

export const TEXTS = {
  CLIENTS: {
    TITLE: 'Registro de cliente',
    NAME: 'Nombre Completo',
    VALIDATION_NAME: 'El nombre es obligatorio',
    EMAIL: 'Correo electronico',
    VALIDATIONE_EMAIL: 'Formato de correo inválido',
    CANCEL: 'Cancelar',
    SUBMIT: 'Enviar Datos',
    UPDATED: 'actualizado',
    CREATED: 'creado',
    SUCCESS_MESSAGE: (action: string) => `Cliente ${action} correctamente`
  },
  CLIENT_LIST: {
    NEW: 'Nuevo cliente',
    TITLE: 'Lista de Clientes',
    NAME: 'Nombre',
    EMAIL: 'Email',
    REGISTRATION_DATE: 'Fecha Registro',
    MODIFY: 'Modificar',
    ELIMINATE: 'Eliminar',
    EMPTY: 'No hay clientes registrados.'
  },
  LOGIN: {
    LOGIN: 'Iniciar Sesión',
    USER: 'Usuario',
    PASSWORD: 'Contraseña',
    ENTER: 'ENTRAR',
    ERROR: 'Credenciales incorrectas'
  },
  MENU: {
    TITLE: 'Panel de Control',
    COPYRIGHT: '2026 Mi Aplicación. Todos los derechos reservados.'
  },
  ORDERS: {
    TITLE: 'Registro de ordenes',
    CLIENT: 'Cliente',
    SELECT: 'Seleccione un cliente',
    VALIDATION_CLIENT: 'El cliente es obligatorio.',
    TOTAL: 'Total de la Orden $',
    VALIDATION_TOTAL: 'Ingrese un monto válido mayor a 0.',
    CANCEL: 'Cancelar',
    UPDATE: 'Actualizar Orden',
    CREATE: 'Crear Orden'
  },
  ORDER_LIST: {
    NEW: 'Nueva orden',
    TITLE: 'Lista de ordenes',
    NAME: 'Nombre',
    EMAIL: 'Email',
    TOTAL: 'Total',
    MODYFY: 'Modificar',
    ELIMINATE: 'Eliminar',
    EMPTY: 'No hay ordenes registradas.'
  },
  CONFIRM: {
    CONFIRM: 'Confirmar eliminación',
    CONFIRM_MESSAGE: (name: string) => `¿Estás seguro de que deseas eliminar al cliente ${name} correctamente?`,
    WARNING: 'Esta acción no se puede deshacer.',
    CANCEL: 'Cancelar',
    ELIMINATE: 'Eliminar Registro'
  },
  PAGINATION: {
    ITEMS: 'Items por página:',
    NEXT_PAGE: 'Siguiente página',
    PREVIOUS_PAGE: 'Página anterior'
  }
}