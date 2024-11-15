import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  private readonly apiUrl =
    'https://pera-api-staging.perapassage.com/api/login';
  private readonly exportUrl =
    'https://pera-api-staging.perapassage.com/api/users/company-employees-front/152/export';

  async exportData() {
    const payload = {
      email: 'mgs@mail.com',
      password: '12345678',
    };

    try {
      // Login işlemi: POST isteği ile access_token alıyoruz
      const loginResponse = await axios.post(this.apiUrl, payload);
      console.log('Login Response:', loginResponse.data);

      const accessToken = loginResponse.data.access_token;
      if (!accessToken) {
        throw new Error('Access token could not be retrieved.');
      }

      // Export işlemi: access_token ile Authorization başlığı ekliyoruz
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization başlığına token ekleniyor
        },
      };

      const params = {
        page: 1,
        search: '',
        per_page: 10,
      };

      // Export verisini almak için GET isteği
      const exportResponse = await axios.get(this.exportUrl, {
        headers: config.headers,
        params,
      });
      console.log('Export Response:', exportResponse.data);

      return exportResponse.data; // Export verisini döndürüyoruz
    } catch (error) {
      console.error(
        'Export failed:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Failed to export data');
    }
  }
}
