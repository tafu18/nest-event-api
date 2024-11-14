import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { Response } from 'express';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    // exception.message üzerinden model adı çıkarma
    const entityName = exception.message.split(' ')[0]; // Mesajda genellikle "EntityName" başta olur

    // Entity ismini düzgün şekilde formatla (ilk harf büyük olacak)
    const formattedEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1).toLowerCase();

    response.status(404).json({
      statusCode: 404,
      message: `${formattedEntityName} not found with the provided ID`,  // Dinamik hata mesajı
      error: 'Not Found',
    });
  }
}
