export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-700 dark:to-amber-800">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Premium Coffee Beans
        </h1>
        <p className="text-xl text-amber-50 max-w-2xl mx-auto">
          세계 각지에서 엄선한 최고급 스페셜티 커피를 만나보세요
        </p>
      </div>
    </header>
  );
}
