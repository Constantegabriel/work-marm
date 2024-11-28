'use client';

import Link from 'next/link';
import Image from 'next/image'; // Usando Image do Next.js
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { PiGearDuotone } from 'react-icons/pi';
import { GiBriefcase, GiStoneBlock } from 'react-icons/gi';

export default function Home() {
  return (
    <section>
      {/* Swiper Section */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 8000 }}
        pagination={{ clickable: true }}
        className="h-screen text-white"
      >
        {/* Slide 1 */}
        <SwiperSlide
          className="relative flex items-center justify-start bg-cover bg-center h-screen"
          style={{ backgroundImage: `url('/img/fachada.jpg')` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
            }}
          ></div>
          <div className="absolute bottom-12 left-[5%] lg:left-10 text-left px-4 md:px-10 pb-10 max-w-lg">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-5 text-white">
              Sua Marmoraria em Florianópolis
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-[80%] md:w-[600px] text-[#e7e7e7] font-medium mb-4 sm:mb-6">
              Oferecemos uma ampla seleção de mármores e granitos nacionais e importados,
              com acabamento impecável e designs únicos.
            </p>
            <Link href="https://maps.app.goo.gl/NPSJPNp6B877nH396">
              <button className="px-6 py-2 bg-gray-800 hover:bg-gray-900 rounded-full text-sm md:text-lg font-semibold transition">
                Solicite um Orçamento
              </button>
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide
          className="relative flex items-end justify-start bg-cover bg-center h-screen"
          style={{ backgroundImage: `url('/img/quarto.jpg')` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
            }}
          ></div>
          <div className="absolute bottom-12 left-[5%] lg:left-10 text-left px-4 md:px-10 pb-10 max-w-lg">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-5 text-white">
              Excelência em Serviços de Marmoraria
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-[80%] md:w-[600px] text-[#e7e7e7] font-medium mb-4 sm:mb-6">
              Realizamos serviços personalizados e de alta qualidade para transformar
              cada ambiente em uma obra de arte.
            </p>
            <button className="px-6 py-2 bg-gray-800 hover:bg-gray-900 rounded-full text-sm md:text-lg font-semibold transition">
              Veja Nossos Serviços
            </button>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide
          className="relative flex items-end justify-start bg-cover bg-center h-screen"
          style={{ backgroundImage: `url('/img/maquinario.avif')` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
            }}
          ></div>
          <div className="absolute bottom-12 left-[5%] lg:left-10 text-left px-4 md:px-10 pb-10 max-w-lg">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-5 text-white">
              Tecnologia e Profissionalismo
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-[80%] md:w-[600px] text-[#e7e7e7] font-medium mb-4 sm:mb-6">
              Utilizamos os melhores maquinários e contamos com uma equipe altamente
              qualificada para entregar resultados excepcionais.
            </p>
            <button className="px-6 py-2 bg-gray-800 hover:bg-gray-900 rounded-full text-sm md:text-lg font-semibold transition">
              Conheça Nossa Estrutura
            </button>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Serviços em destaque */}
      <div className="bg-gray-100 py-12 px-6 md:px-20">
        <h2 className="text-center text-gray-700 text-2xl md:text-4xl font-bold mb-8">
          Serviços de Qualidade para Cada Projeto
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="text-center bg-gray-200 p-8 rounded-lg hover:shadow-lg transition w-full sm:w-[400px]">
            <GiBriefcase className="mx-auto text-[50px]" />
            <h1 className="text-lg font-bold">PORTIFÓLIO</h1>
            <p className="text-gray-600 text-sm mt-2">
              Inspire-se com nossos projetos realizados, criados com precisão e
              dedicação.
            </p>
          </div>

          <div className="text-center bg-gray-200 p-8 rounded-lg hover:shadow-lg transition w-full sm:w-[400px]">
            <GiStoneBlock className="mx-auto text-[50px]" />
            <h1 className="text-lg font-bold">PRODUTOS</h1>
            <p className="text-gray-600 text-sm mt-2">
              Trabalhamos com os melhores materiais para oferecer qualidade e
              sofisticação.
            </p>
          </div>

          <div className="text-center bg-gray-200 p-8 rounded-lg hover:shadow-lg transition w-full sm:w-[400px]">
            <PiGearDuotone className="mx-auto text-[50px]" />
            <h1 className="text-lg font-bold">MAQUINÁRIO</h1>
            <p className="text-gray-600 text-sm mt-2">
              Modernos equipamentos e uma equipe qualificada garantem resultados
              superiores.
            </p>
          </div>
        </div>
      </div>

      {/* Sobre nós */}
      <div className="bg-white py-16 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <Image
            src="/img/fachada.jpg"
            alt="Nossa Fachada"
            width={600}
            height={400}
            className="w-[80%] border-l-[10px] border-gray-800 shadow-lg"
          />
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Sobre a <span className="text-gray-800">Marmoraria Florianópolis</span>
            </h2>
            <p className="text-gray-600 mb-4">
              Com anos de experiência, oferecemos produtos e serviços que
              transformam projetos em realidade. Nosso compromisso é com a
              excelência e a satisfação dos nossos clientes.
            </p>
            <p className="text-gray-600">
              Seja para reformas residenciais ou grandes projetos comerciais,
              estamos prontos para atender suas necessidades com materiais de
              alta qualidade e acabamentos impecáveis.
            </p>
          </div>
        </div>
      </div>

      {/* Galeria */}
      <div className="bg-gray-100 py-12 px-6 md:px-20">
        <h2 className="text-center text-gray-800 text-2xl md:text-4xl font-bold mb-8">
          Galeria de Serviços
        </h2>
        <div className="grid grid-cols-1 mt-[20px] sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Image
            src="/img/gs1.jpg"
            alt="Projeto 1"
            width={400}
            height={300}
            className="w-full h-60 object-cover rounded-lg shadow-lg"
          />
          <Image
            src="/img/gs2.jpg"
            alt="Projeto 2"
            width={400}
            height={300}
            className="w-full h-60 object-cover rounded-lg shadow-lg"
          />
          <Image
            src="/img/quarto.jpg"
            alt="Projeto 3"
            width={400}
            height={300}
            className="w-full h-60 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex mt-[25px] lg:mt-[15px] justify-center">
          <button className="px-7 py-2 rounded-md text-white font-medium bg-gray-800">
            Nossos Serviços
          </button>
        </div>
      </div>
    </section>
  );
}
