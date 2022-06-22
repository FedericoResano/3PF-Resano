import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { AlumnosService } from './alumnos.service';

describe('AlumnosService', () => {
  let service: AlumnosService;
  let alumnosList = [
    {
      id: 1,
      nombre: 'Federico',
      apellido: 'Resano',
      mail: 'federico@mail.com',
      edad: 27,
      fechaNacimiento: '19940819',
      usuario: 'federico',
    }
  ]

  let httpController: HttpTestingController;
  let url= 'https://62a61d0e430ba53411d14cbe.mockapi.io/api/Alumnos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AlumnosService);
    httpController= TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia obtener getAll()', ()=> {
    service.getAll().subscribe(
      (res)=>{
        expect(res).toEqual(alumnosList)
      }
    )
    const req= httpController.expectOne({
      method:'GET',
      url: `${url}`
    })

    req.flush(alumnosList);
  })
});
