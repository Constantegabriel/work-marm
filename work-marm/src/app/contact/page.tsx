import Link from "next/link";

export default function Contato() {
    return (
        <section className="bg-gray-100 min-h-screen py-16 px-8 md:px-20">
            {/* Título da página */}
            <div className="text-center mb-12">
                <h1 className="text-4xl mt-[69px] md:text-5xl font-bold text-gray-800">
                    Contato
                </h1>
                <p className="text-gray-600 mt-4 text-lg">
                    Entre em contato conosco! Estamos à disposição para atender suas
                    necessidades.
                </p>
            </div>

            {/* Informações de Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Informações */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Informações de Contato
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Rua 123, 1234 - Centro, Florianópolis, Santa Catarina, 88000-000
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>Telefone:</strong> (48) 9999-9999
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>WhatsApp:</strong> (48) 99999-9999
                    </p>
                    <p className="text-gray-600 mb-4">
                        <strong>Email:</strong> contato@marmoraria.com
                    </p>
                    <Link
                        href="https://api.whatsapp.com/send?phone=55999999999"
                        target="_blank"
                    >
                        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition">
                            Fale pelo WhatsApp
                        </button>
                    </Link>
                </div>

                {/* Formulário de Contato */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Envie uma Mensagem
                    </h2>
                    <form action="#" method="post">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="message"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Mensagem
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
                        >
                            Enviar Mensagem
                        </button>
                    </form>
                </div>
            </div>

            {/* Mapa */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-800 p-4">
                    Onde ficamos localizados:
                </h2>
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d353.89135600586115!2d-48.6523692!3d-27.505828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95275338e43117e7%3A0x593940f8a5d7ac1c!2sMarmoraria%20Florian%C3%B3polis!5e0!3m2!1sen!2sbr!4v1690375038293!5m2!1sen!2sbr"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

            </div>
        </section>
    );
}
