'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  APILoadingStatus,
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
} from '@vis.gl/react-google-maps';
import { MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/catalog';
import { useLanguage } from '@/lib/i18n/context';

const OFFICE_COORDS = { lat: 8.9974, lng: 38.7892 };

let quotaTapInstalled = false;

export function installGmpQuotaTap(): void {
  if (typeof window === 'undefined' || quotaTapInstalled) {
    return;
  }
  quotaTapInstalled = true;

  (window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  };

  const origError = console.error;
  console.error = (...args: unknown[]) => {
    origError.apply(console, args);
    const msg = args.map((a) => String(a)).join(' ');
    if (
      msg.includes('OverQuotaMapError') ||
      msg.includes('QuotaExceededError')
    ) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    }
  };
}

if (typeof window !== 'undefined') {
  installGmpQuotaTap();
}

const emptySubscribe = () => () => {};

function OfficeMarkerWithInfo() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { t } = useLanguage();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={OFFICE_COORDS}
        title={t.brand.mapTitle}
        onClick={() => setInfoOpen((prev) => !prev)}
      >
        <Pin
          background="#0B0D10"
          borderColor="#D4AF37"
          glyphColor="#D4AF37"
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={260}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="space-y-1.5 p-1 text-[#0B0D10]">
            <p className="text-xs font-bold text-[#0B0D10]">{t.brand.name}</p>
            <p className="text-[11px] leading-snug text-slate-700">
              {t.brand.officeAddress}
            </p>
            <a
              href={COMPANY_INFO.phoneHref}
              className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#8F6D10] hover:underline"
            >
              <Phone className="h-3 w-3 text-[#C59B27]" aria-hidden="true" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function OfficeMapCanvas() {
  const status = useApiLoadingStatus();
  const { t } = useLanguage();

  if (
    status === APILoadingStatus.AUTH_FAILURE ||
    status === APILoadingStatus.FAILED
  ) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#161B22] p-4 text-center">
        <MapPin className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
        <p className="text-xs font-semibold text-[#F8FAFC]">
          {t.brand.mapTitle}
        </p>
        <p className="max-w-xs text-[11px] leading-relaxed text-[#A1A8B3]">
          {t.contact.mapFallbackNotice}
        </p>
      </div>
    );
  }

  return (
    <Map
      mapId="DEMO_MAP_ID"
      defaultCenter={OFFICE_COORDS}
      defaultZoom={16}
      gestureHandling="cooperative"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      className="h-full w-full"
    >
      <OfficeMarkerWithInfo />
    </Map>
  );
}

interface OfficeGoogleMapProps {
  apiKey?: string;
}

export default function OfficeGoogleMap({ apiKey }: OfficeGoogleMapProps) {
  const { locale, t } = useLanguage();
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    installGmpQuotaTap();
  }, []);

  const globalKey = isClient
    ? ((globalThis as { GOOGLE_MAPS_API_KEY?: string }).GOOGLE_MAPS_API_KEY ??
      '')
    : '';

  const resolvedKey =
    apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || globalKey;

  if (!isClient || !resolvedKey) {
    return (
      <div className="relative flex h-64 w-full flex-col items-center justify-center gap-2 border-b border-[rgba(212,175,55,0.22)] bg-[#161B22] p-4 text-center">
        <MapPin className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
        <p className="text-xs font-semibold text-[#F8FAFC]">
          {t.brand.mapTitle}
        </p>
        <p className="font-mono text-[11px] text-[#A1A8B3]">
          {COMPANY_INFO.coordinatesLabel}
        </p>
      </div>
    );
  }

  const mapsLang = locale === 'am' ? 'am' : 'en';

  return (
    <div className="relative h-64 w-full overflow-hidden border-b border-[rgba(212,175,55,0.22)] bg-[#161B22]">
      <APIProvider
        apiKey={resolvedKey}
        libraries={['marker']}
        language={mapsLang}
        region="ET"
      >
        <OfficeMapCanvas />
      </APIProvider>
    </div>
  );
}
