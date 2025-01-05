export interface RegisterResponse {
    success: boolean;
    message: string;
    userId?: string; // Opcional: si el backend devuelve un ID del usuario creado
  }
  