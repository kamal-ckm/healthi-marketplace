'use client';

import { Raleway, Source_Sans_3 } from \"next/font/google\";
import \"./globals.css\";

const raleway = Raleway({
  variable: \"--font-heading\",
  subsets: [\"latin\"],
  display: \"swap\",\n});\n\nconst sourceSans = Source_Sans_3({\n  variable: \"--font-body\",\n  subsets: [\"latin\"],
  display: \"swap\",\n});\n\nimport { CustomerAuthProvider } from \"@/lib/auth-customer\";\nimport { CartProvider } from \"@/lib/cart-context\";\n\nexport default function RootLayout({\n  children,\n}: Readonly<{\n  children: React.ReactNode;\n}>) {\n  return (\n    <html lang=\"en\">\n      <body className={`${raleway.variable} ${sourceSans.variable} antialiased`}>\n        <CustomerAuthProvider>\n          <CartProvider>\n            {children}\n          </CartProvider>\n        </CustomerAuthProvider>\n      </body>\n    </html>\n  );\n}
