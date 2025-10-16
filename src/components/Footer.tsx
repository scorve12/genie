export default function Footer() {
  const footerSections = [
    {
      title: 'About Us',
      content: '최고의 커피 경험을 제공하기 위해 전 세계의 우수한 농장과 직접 거래합니다.',
    },
    {
      title: 'Products',
      links: ['원두', '드립백', '콜드브루'],
    },
    {
      title: 'Support',
      links: ['배송 안내', '반품/교환', '자주 묻는 질문'],
    },
    {
      title: 'Contact',
      content: 'Email: hello@coffeebeans.com\nPhone: 02-1234-5678\nMon-Fri: 9:00 - 18:00',
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              {section.content && (
                <p className="text-sm whitespace-pre-line">{section.content}</p>
              )}
              {section.links && (
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Premium Coffee Beans. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
