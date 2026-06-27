/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useMemo, useState } from "react";

const QR_CODE_PATH = "/qr-code";

const QRCode = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState(QR_CODE_PATH);

    useEffect(() => {
        setQrCodeUrl(`${window.location.origin}${QR_CODE_PATH}`);
    }, []);

    const qrSrc = useMemo(() => {
        const params = new URLSearchParams({
            size: "220x220",
            margin: "16",
            data: qrCodeUrl,
        });

        return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
    }, [qrCodeUrl]);

    return (
        <div className="w-full max-w-[260px] rounded-lg border border-[#7042f861] bg-[#0300148f] p-4 shadow-lg shadow-[#2A0E61]/30 backdrop-blur-md">
            <a
                href={qrCodeUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-md bg-white p-3"
                aria-label="Open QR code page"
            >
                <img
                    src={qrSrc}
                    alt="QR code to open the QR code page"
                    width={220}
                    height={220}
                    className="h-auto w-full"
                />
            </a>

            <div className="mt-3 text-center">
                <p className="text-sm font-semibold text-white">Scan QR code</p>
                <p className="mt-1 break-all text-xs leading-5 text-gray-400">
                    {qrCodeUrl}
                </p>
            </div>
        </div>
    );
};

export default QRCode;
