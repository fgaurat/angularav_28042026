import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { AddService } from './add-service';
import { Add } from '../add';

describe('AddService', () => {
  let component: AddService;
  let fixture: ComponentFixture<AddService>;
  let addService: Add;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddService],
      providers: [Add],
    }).compileComponents();

    fixture = TestBed.createComponent(AddService);
    component = fixture.componentInstance;
    addService = TestBed.inject(Add);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Injection du service Add', () => {
    it('le service Add doit être injecté', () => {
      expect(addService).toBeTruthy();
      expect(addService).toBeInstanceOf(Add);
    });

    it('le composant doit utiliser la même instance du service que TestBed', () => {
      const injectedFromTestBed = TestBed.inject(Add);
      expect(injectedFromTestBed).toBe(addService);
    });
  });

  describe('Valeurs initiales', () => {
    it('val1 doit être initialisé à 0', () => {
      expect(component.val1).toBe(0);
    });

    it('val2 doit être initialisé à 0', () => {
      expect(component.val2).toBe(0);
    });

    it('result doit être initialisé à 0', () => {
      expect(component.result).toBe(0);
    });
  });

  describe('Méthode compute()', () => {
    it('doit déléguer le calcul au service Add', () => {
      const spy = vi.spyOn(addService, 'add');
      component.val1 = 3;
      component.val2 = 4;

      component.compute();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(3, 4);
    });

    it('doit affecter result avec la valeur retournée par le service', () => {
      vi.spyOn(addService, 'add').mockReturnValue(42);
      component.val1 = 1;
      component.val2 = 1;

      const returned = component.compute();

      expect(returned).toBe(42);
      expect(component.result).toBe(42);
    });

    it('doit additionner correctement deux nombres positifs', () => {
      component.val1 = 5;
      component.val2 = 10;
      expect(component.compute()).toBe(15);
      expect(component.result).toBe(15);
    });

    it('doit additionner des nombres négatifs', () => {
      component.val1 = -3;
      component.val2 = -7;
      expect(component.compute()).toBe(-10);
    });

    it('doit convertir les chaînes numériques en nombres', () => {
      component.val1 = '10' as unknown as number;
      component.val2 = '20' as unknown as number;
      expect(component.compute()).toBe(30);
      expect(component.result).toBe(30);
    });

    it('ne doit pas concaténer des chaînes', () => {
      component.val1 = '5' as unknown as number;
      component.val2 = '7' as unknown as number;
      expect(component.compute()).not.toBe('57' as unknown as number);
      expect(component.compute()).toBe(12);
    });
  });

  describe('Override du service avec un mock', () => {
    it('doit pouvoir remplacer le service Add par un mock via providers', async () => {
      TestBed.resetTestingModule();
      const mockAdd = { add: vi.fn().mockReturnValue(999) };

      await TestBed.configureTestingModule({
        imports: [AddService],
        providers: [{ provide: Add, useValue: mockAdd }],
      }).compileComponents();

      const localFixture = TestBed.createComponent(AddService);
      const localComponent = localFixture.componentInstance;
      await localFixture.whenStable();

      localComponent.val1 = 1;
      localComponent.val2 = 2;
      const result = localComponent.compute();

      expect(mockAdd.add).toHaveBeenCalledWith(1, 2);
      expect(result).toBe(999);
      expect(localComponent.result).toBe(999);
    });
  });

  describe('Intégration template', () => {
    it('doit afficher le résultat dans le paragraphe #result après un clic', async () => {
      component.val1 = 6;
      component.val2 = 4;
      await fixture.whenStable();

      const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      button.click();
      await fixture.whenStable();

      const resultEl = fixture.debugElement.query(By.css('#result')).nativeElement as HTMLElement;
      expect(resultEl.textContent?.trim()).toBe('10');
    });

    it('doit appeler compute() au clic sur le bouton', async () => {
      const spy = vi.spyOn(component, 'compute');
      component.val1 = 1;
      component.val2 = 2;
      await fixture.whenStable();

      const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      button.click();
      await fixture.whenStable();

      expect(spy).toHaveBeenCalled();
      expect(component.result).toBe(3);
    });

    it('doit contenir deux inputs et un bouton "Compute"', () => {
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      const button = fixture.debugElement.query(By.css('button'));

      expect(inputs.length).toBe(2);
      expect(button).toBeTruthy();
      expect((button.nativeElement as HTMLButtonElement).textContent?.trim()).toBe('Compute');
    });
  });
});
