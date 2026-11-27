'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck2,
  MapPin,
  X,
} from 'lucide-react';
import { PROJECT_IMAGE_MAP } from '@/lib/data/project-images';
import {
  getProjectStatusCounts,
  REAL_ESTATE_PROJECTS,
  type ProjectStatus,
  type RealEstateProject,
} from '@/lib/data/projects';
import { useLanguage } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

type FilterMode = 'ALL' | ProjectStatus;

interface ProjectsAndCertificatesSectionProps {
  onRequestProjectQuote: (projectTitle: string, projectCode: string) => void;
}

export default function ProjectsAndCertificatesSection({
  onRequestProjectQuote,
}: ProjectsAndCertificatesSectionProps) {
  const { locale, t } = useLanguage();
  const copy = t.contractor.projectsSection;

  const [filter, setFilter] = useState<FilterMode>('ALL');
  const [selectedProject, setSelectedProject] =
    useState<RealEstateProject | null>(null);

  const counts = getProjectStatusCounts(REAL_ESTATE_PROJECTS);

  const visibleProjects =
    filter === 'ALL'
      ? REAL_ESTATE_PROJECTS
      : REAL_ESTATE_PROJECTS.filter((project) => project.status === filter);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const filterTabs: Array<{
    key: FilterMode;
    label: string;
    count: number;
  }> = [
    { key: 'ALL', label: copy.filterAll, count: counts.total },
    {
      key: 'handed_over',
      label: copy.filterHandedOver,
      count: counts.handedOver,
    },
    {
      key: 'completing_soon',
      label: copy.filterCompleting,
      count: counts.completingSoon,
    },
  ];

  return (
    <section
      id="projects"
      className="border-b border-white/[0.08] bg-[#0A0A0B] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header & Dynamic Count */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <ScrollReveal className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.08em] text-[#F59E0B] uppercase">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              {copy.headline}
            </h2>
            <p className="mt-4 text-sm leading-[1.75] text-[#A1A8B3] sm:text-base">
              {copy.subcopy}
            </p>
          </ScrollReveal>

          <div
            data-testid="projects-total-count"
            className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-xl border border-[#F59E0B]/30 bg-[#111214] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] lg:self-end"
          >
            <Building2 className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
            <span className="tabular-nums">{copy.countLabel(counts.total)}</span>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div
          role="tablist"
          aria-label={copy.headline}
          className="mt-9 flex flex-wrap items-center gap-2.5"
        >
          {filterTabs.map((tab) => {
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                data-testid={`projects-filter-${tab.key}`}
                onClick={() => setFilter(tab.key)}
                className={`inline-flex min-h-[42px] items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'border-[#F59E0B] bg-[#F59E0B] text-[#0A0A0B]'
                    : 'border-white/[0.1] bg-[#111214] text-[#CBD5E1] hover:border-[#F59E0B]/45 hover:text-[#F8FAFC]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`font-mono tabular-nums text-[11px] font-bold ${
                    active ? 'text-[#0A0A0B]' : 'text-[#F59E0B]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2">
          {visibleProjects.map((project, idx) => {
            const localized = project.copy[locale];
            const isHandedOver = project.status === 'handed_over';
            const statusLabel = isHandedOver
              ? copy.statusHandedOver
              : copy.statusCompletingSoon;

            return (
              <ScrollReveal key={project.id} delay={idx * 0.05}>
                <article
                  data-testid={`project-card-${project.id}`}
                  className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111214] transition-colors hover:border-[#F59E0B]/40"
                >
                  <div>
                    {/* Clean Photography Frame — No text badges overlapping photo subjects */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.08] bg-[#0A0A0B]">
                      <Image
                        src={PROJECT_IMAGE_MAP[project.imageKey]}
                        alt={localized.title}
                        fill
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-6 sm:p-7">
                      {/* Status Badge & Code Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5">
                        <span
                          data-testid={`project-status-${project.id}`}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold ${
                            isHandedOver
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                              : 'border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#F59E0B]'
                          }`}
                        >
                          {isHandedOver ? (
                            <Award className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          <span>{statusLabel}</span>
                        </span>

                        <span className="font-mono tabular-nums text-xs text-[#A1A8B3]">
                          {project.code} · {project.completionLabel}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold leading-snug text-[#F8FAFC]">
                        {localized.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#A1A8B3]">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin
                            className="h-3.5 w-3.5 text-[#F59E0B]"
                            aria-hidden="true"
                          />
                          <span>{localized.location}</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{project.unitsOrScale}</span>
                      </div>

                      {project.certificateRef && (
                        <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#F59E0B]">
                          <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>
                            {copy.certificatePrefix}: {project.certificateRef}
                          </span>
                        </p>
                      )}

                      <p className="mt-3.5 text-sm leading-[1.7] text-[#CBD5E1]">
                        {localized.scopeSummary}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.06] px-6 py-4 sm:px-7">
                    <button
                      type="button"
                      data-testid={`project-details-btn-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-white/[0.12] bg-[#16181D] px-4 py-2 text-xs font-semibold text-[#F8FAFC] transition-colors hover:border-[#F59E0B]/50 hover:text-[#F59E0B] whitespace-nowrap"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                      <span>{copy.viewDetailsBtn}</span>
                    </button>

                    <button
                      type="button"
                      data-testid={`project-quote-btn-${project.id}`}
                      onClick={() =>
                        onRequestProjectQuote(localized.title, project.code)
                      }
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#F59E0B]/15 px-4 py-2 text-xs font-bold text-[#F59E0B] transition-colors hover:bg-[#F59E0B] hover:text-[#0A0A0B] whitespace-nowrap"
                    >
                      <span>{copy.requestSimilarBtn}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Project & Handover Certificate Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.copy[locale].title}
          onClick={() => setSelectedProject(null)}
        >
          <div
            data-testid="project-detail-modal"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#F59E0B]/35 bg-[#111214] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.08] bg-[#111214] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#F59E0B]">
                  {selectedProject.code}
                </span>
                <span aria-hidden="true" className="text-[#A1A8B3]">
                  ·
                </span>
                <span className="text-xs font-semibold text-[#F8FAFC]">
                  {selectedProject.status === 'handed_over'
                    ? copy.statusHandedOver
                    : copy.statusCompletingSoon}
                </span>
              </div>
              <button
                type="button"
                data-testid="project-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label={copy.closeModalAria}
                className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-xl border border-white/[0.12] bg-[#16181D] text-[#A1A8B3] hover:border-[#F59E0B]/60 hover:text-[#F8FAFC]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-7">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0A0A0B]">
                <Image
                  src={PROJECT_IMAGE_MAP[selectedProject.imageKey]}
                  alt={selectedProject.copy[locale].title}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-bold text-[#F8FAFC] sm:text-2xl">
                  {selectedProject.copy[locale].title}
                </h3>
                <p className="mt-1.5 text-xs text-[#A1A8B3]">
                  {selectedProject.copy[locale].location} ·{' '}
                  {selectedProject.unitsOrScale} ·{' '}
                  {selectedProject.completionLabel}
                </p>
                {selectedProject.certificateRef && (
                  <p className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#F59E0B]">
                    <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {copy.certificatePrefix}: {selectedProject.certificateRef}
                    </span>
                  </p>
                )}
              </div>

              <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#0A0A0B] p-4 sm:p-5">
                <p className="text-xs font-bold tracking-wide text-[#F59E0B] uppercase">
                  {copy.modalHandoverHeading}
                </p>
                <p className="mt-2 text-sm leading-[1.7] text-[#E2E8F0]">
                  {selectedProject.copy[locale].handoverNote}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold tracking-wide text-[#F8FAFC] uppercase">
                  {copy.modalDeliverablesHeading}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {selectedProject.copy[locale].deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#CBD5E1]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-end gap-3 border-t border-white/[0.08] pt-5">
                <button
                  type="button"
                  data-testid="project-modal-quote-btn"
                  onClick={() => {
                    const projectTitle = selectedProject.copy[locale].title;
                    const projectCode = selectedProject.code;
                    setSelectedProject(null);
                    onRequestProjectQuote(projectTitle, projectCode);
                  }}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#F59E0B] px-5 py-2.5 text-xs font-bold text-[#0A0A0B] transition-colors hover:bg-[#D97706]"
                >
                  <span>{copy.modalRequestInspectionBtn}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
