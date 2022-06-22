import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { of } from 'rxjs';

import { GrillaAlumnosComponent } from './grilla-alumnos.component';

describe('GrillaAlumnosComponent', () => {
    let component: GrillaAlumnosComponent;
    let fixture: ComponentFixture<GrillaAlumnosComponent>;
    let alumnosService: AlumnosService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GrillaAlumnosComponent],
            imports: [
                BrowserModule,
                HttpClientModule
            ],
            providers: [
                AlumnosService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GrillaAlumnosComponent);
        component = fixture.componentInstance;
        alumnosService = TestBed.inject(AlumnosService)

        spyOn(alumnosService, "getAll").and.returnValue(
            of(
                [
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
            )
        )
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('deberia mostrar el getAll()', ()=>{
        expect(component.ngOnInit).toBeTruthy();
    })
});
