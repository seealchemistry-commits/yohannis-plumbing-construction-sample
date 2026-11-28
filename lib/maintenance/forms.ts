import { isValidEthiopianPhone } from '@/lib/commerce/cart';
import type { TranslationDictionary } from '@/lib/i18n/types';

export interface ClientMaintenanceFormInput {
  facilityType: string;
  engagementType: string;
  location: string;
  contactName: string;
  phone: string;
  notes: string;
}

export interface TechnicianApplicationInput {
  fullName: string;
  experience: string;
  specialty: string;
  phone: string;
  area: string;
}

export interface MaintenanceValidationResult<T extends string> {
  valid: boolean;
  errors: Partial<Record<T, string>>;
}

export function validateClientMaintenanceInput(
  input: ClientMaintenanceFormInput,
  t: TranslationDictionary
): MaintenanceValidationResult<keyof ClientMaintenanceFormInput> {
  const errors: Partial<Record<keyof ClientMaintenanceFormInput, string>> = {};

  if (input.contactName.trim().length < 2) {
    errors.contactName = t.validation.customerNameRequired;
  }
  if (!isValidEthiopianPhone(input.phone)) {
    errors.phone = t.validation.invalidPhone;
  }
  if (input.location.trim().length < 2) {
    errors.location = t.maintenancePage.validation.locationRequired;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateTechnicianApplicationInput(
  input: TechnicianApplicationInput,
  t: TranslationDictionary
): MaintenanceValidationResult<keyof TechnicianApplicationInput> {
  const errors: Partial<Record<keyof TechnicianApplicationInput, string>> = {};

  if (input.fullName.trim().length < 2) {
    errors.fullName = t.validation.customerNameRequired;
  }
  if (!isValidEthiopianPhone(input.phone)) {
    errors.phone = t.validation.invalidPhone;
  }
  if (!input.experience.trim()) {
    errors.experience = t.maintenancePage.validation.experienceRequired;
  }
  if (!input.specialty.trim()) {
    errors.specialty = t.maintenancePage.validation.specialtyRequired;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatClientMaintenanceSummary(
  input: ClientMaintenanceFormInput
): string {
  const lines = [
    `[Dedicated Maintenance Request]`,
    `Facility: ${input.facilityType.trim()}`,
    `Service Model: ${input.engagementType.trim()}`,
    `Location: ${input.location.trim()}`,
    `Contact: ${input.contactName.trim()} (${input.phone.trim()})`,
  ];
  if (input.notes.trim()) {
    lines.push(`Notes: ${input.notes.trim()}`);
  }
  return lines.join('\n');
}

export function formatTechnicianApplicationSummary(
  input: TechnicianApplicationInput
): string {
  const lines = [
    `[Technician Staffing Application]`,
    `Name: ${input.fullName.trim()}`,
    `Experience: ${input.experience.trim()}`,
    `Specialty: ${input.specialty.trim()}`,
    `Phone: ${input.phone.trim()}`,
  ];
  if (input.area.trim()) {
    lines.push(`Area: ${input.area.trim()}`);
  }
  return lines.join('\n');
}

export function buildWhatsAppHandoffUrl(
  baseUrl: string,
  message: string
): string {
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function buildTelegramHandoffUrl(
  telegramBaseHref: string,
  message: string
): string {
  return `${telegramBaseHref}?text=${encodeURIComponent(message)}`;
}
