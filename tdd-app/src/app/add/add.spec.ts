import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Add } from './add';

describe('Add', () => {
  let component: Add;
  let fixture: ComponentFixture<Add>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Add],
    }).compileComponents();

    fixture = TestBed.createComponent(Add);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  describe('Méthode sum()', () => {
    it('doit additionner deux nombres positifs', () => {
      component.val1 = 2;
      component.val2 = 3;
      expect(component.sum()).toBe(5);
      expect(component.result).toBe(5);
    });

    it('doit additionner avec des zéros', () => {
      component.val1 = 0;
      component.val2 = 0;
      expect(component.sum()).toBe(0);
      expect(component.result).toBe(0);
    });

    it('doit additionner des nombres négatifs', () => {
      component.val1 = -5;
      component.val2 = -3;
      expect(component.sum()).toBe(-8);
      expect(component.result).toBe(-8);
    });

    it('doit additionner un positif et un négatif', () => {
      component.val1 = 10;
      component.val2 = -4;
      expect(component.sum()).toBe(6);
      expect(component.result).toBe(6);
    });

    it('doit additionner des nombres décimaux', () => {
      component.val1 = 1.5;
      component.val2 = 2.5;
      expect(component.sum()).toBe(4);
      expect(component.result).toBe(4);
    });

    it('doit convertir les chaînes numériques en nombres', () => {
      component.val1 = '10' as unknown as number;
      component.val2 = '20' as unknown as number;
      expect(component.sum()).toBe(30);
      expect(component.result).toBe(30);
    });

    it('ne doit pas concaténer des chaînes (bug typique)', () => {
      component.val1 = '5' as unknown as number;
      component.val2 = '7' as unknown as number;
      expect(component.sum()).not.toBe('57' as unknown as number);
      expect(component.sum()).toBe(12);
    });
  });

  describe('Intégration template', () => {
    it('doit afficher le résultat dans le paragraphe #result', async () => {
      component.val1 = 4;
      component.val2 = 6;
      await fixture.whenStable();

      const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      button.click();
      await fixture.whenStable();

      const resultEl = fixture.debugElement.query(By.css('#result')).nativeElement as HTMLElement;
      expect(resultEl.textContent?.trim()).toBe('10');
    });

    it('doit appeler sum() au clic sur le bouton', async () => {
      const spy = vi.spyOn(component, 'sum');
      component.val1 = 1;
      component.val2 = 2;
      await fixture.whenStable();

      const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      button.click();
      await fixture.whenStable();

      expect(spy).toHaveBeenCalled();
      expect(component.result).toBe(3);
    });

    it('doit mettre à jour l\'affichage après un clic sur le bouton', async () => {
      component.val1 = 7;
      component.val2 = 8;
      await fixture.whenStable();

      const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      button.click();
      await fixture.whenStable();

      const resultEl = fixture.debugElement.query(By.css('#result')).nativeElement as HTMLElement;
      expect(resultEl.textContent?.trim()).toBe('15');
    });

    it('doit contenir deux inputs et un bouton', () => {
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      const button = fixture.debugElement.query(By.css('button'));

      expect(inputs.length).toBe(2);
      expect(button).toBeTruthy();
      expect((button.nativeElement as HTMLButtonElement).textContent?.trim()).toBe('Sum');
    });
  });
});
