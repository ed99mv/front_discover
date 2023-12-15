# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# User.create([{full_name: "Edward Medina Vargas", email: "medinaedward988@gmail.com", phone_number: "506-8795 6065",
#     country: "Costa Rica", password: "604530803edd."},
#     {full_name: "Blue Magic", email: "bm@gmail.com", phone_number: "506-5013 5011",
#         country: "Costa Rica", password: "1234asd"}
#     ])
# Gallery.create([
#     { photo_path: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/21/0d.jpg" },
#     { photo_path: "https://www.civitatis.com/f/costa-rica/san-jose/tour-isla-tortuga-589x392.jpg" },
#     { photo_path: "https://radios.ucr.ac.cr/wp-content/uploads/2021/08/2021-08-Simbiosis-PNIslaSanLucas-001.jpg"}
#   ])

Company.create([{name: "Blue Magic Tour",
     description: "Bienvenido a nuestra empresa de tours en bote, una experiencia única que te lleva a explorar las maravillas de las islas del Golfo del Pacífico. Nos especializamos en ofrecer emocionantes y memorables recorridos en barco, brindándote la oportunidad de descubrir la belleza natural y la diversidad de la vida marina en esta región impresionante. Nuestros tours están diseñados para aquellos que buscan escapar de lo cotidiano y sumergirse en un mundo de paisajes pintorescos y aguas cristalinas. Te invitamos a unirte a nosotros en una aventura donde el lujo se encuentra con la naturaleza, y cada momento se convierte en una oportunidad para crear recuerdos duraderos. Con tripulaciones experimentadas y botes especialmente equipados, garantizamos la seguridad y comodidad mientras te llevamos a través de las islas del Golfo del Pacífico. Desde playas vírgenes hasta arrecifes de coral coloridos, cada parada está diseñada para ofrecer una experiencia única, ya sea disfrutando de la serenidad de la playa, explorando la vida marina con snorkel o simplemente relajándote en la cubierta del barco mientras el sol se pone sobre el océano. Nuestra misión es proporcionar un servicio excepcional que no solo satisfaga tus expectativas, sino que las supere. Nos enorgullece ofrecer un enfoque personalizado, destacando la belleza natural y cultural de las islas del Golfo del Pacífico. Únete a nosotros para un viaje inolvidable que te conectará con la majestuosidad de la naturaleza y te dejará con un amor duradero por el mar y sus tesoros escondidos.",
     ubication: "Puntarenas, Puntarenas, Costa Rica"}])
# Tour.create([{name: "Isla San Lucas", description: "
#     ¡Visitar Isla Tortuga en Costa Rica es una verdadera escapada al paraíso tropical! Esta isla, ubicada en el Golfo de Nicoya, es un destino magnífico para aquellos que buscan playas de ensueño y aguas cristalinas.
    
#     Normalmente, se accede a Isla Tortuga a través de excursiones de un día desde ciudades cercanas como Jacó, Puntarenas o Montezuma. El viaje en bote hasta la isla en sí es una experiencia emocionante, ya que ofrece vistas panorámicas del océano y, a veces, se pueden avistar delfines juguetones a lo largo del camino.
    
#     Al llegar, te reciben playas de arena blanca y aguas azul turquesa, perfectas para nadar, hacer snorkel o bucear para explorar la rica vida marina que se esconde bajo la superficie. Además de las actividades acuáticas, puedes disfrutar de caminatas cortas por senderos naturales que te permiten apreciar la exuberante vegetación y, si tienes suerte, observar diversas especies de aves y animales.
    
#     Relajarse en la playa, tomar el sol y disfrutar de deliciosos mariscos frescos son parte integral de la experiencia en Isla Tortuga. Muchos visitantes aprovechan para participar en actividades como kayak, voleibol playero o simplemente descansar en la orilla mientras admiran la belleza natural que rodea la isla.
    
#     En resumen, visitar Isla Tortuga es sumergirse en un entorno paradisíaco, rodeado de naturaleza espectacular y la oportunidad de disfrutar de un día inolvidable en un entorno tropical idílico.",
#      price: 26000
#      }])
# Photo.create({photo_url: "https://yourcostaricaadventure.com/wp-content/uploads/2022/07/Isla-Tortuga-2.jpg"})