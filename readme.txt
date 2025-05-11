Cosas aprendidas en la web de aterrizaje 

HTML
- aria-label="Facebook": Proporciona una etiqueta de texto para elementos que no tienen texto visible,
mejorando la accesibilidad para lectores de pantalla (en este caso, describe el propósito del icono).
- rel="noopener noreferrer": Mejora la seguridad al evitar que la nueva pestaña acceda
a la ventana original y también puede influir en el envío de la referencia (referrer) por privacidad. 

Nomenclaturas con metodo BEM
(las partes que mas me cuesta, definir donde estas como una carpeta es decir ej: Header definira donde estamos
despues lo que nos designara la profundidad sera el siguiente termino ya sea TOP, buttom o lo que sea).

- Especificidad y Mantenibilidad: Solo tendrás que modificar la clase footer__list. Si solo necesitas cambiar el estilo de 
la lista de redes sociales, modificarás footer__list--social sin afectar a otras listas.

- Claridad y Organización: La nomenclatura BEM deja claro que footer__list--social 
es un tipo específico de footer__list. La doble guion medio (--) indica visualmente 
que se trata de un modificador del elemento. Esto mejora la legibilidad del HTML y el CSS.


CSS

POSITION: (es mas importante de lo que hemos hablado hasta ahora o al menos a mi me lo parece).
- Funcionamiento STICKY: DEF. Es como si tubiese 'position: relative' fluye dentro del documento de manera normal, pero
se activa cuando alcanza cierto umbral definido por las propiedades top, right, bottom o left. Una vez alcanzado ese umbral
se comporta como si tuviera position:fixed, pero solo dentro de los limites de su contenedor padre.
POSIBLES ERRORES COMUNES: 
-- FALTA DEL UMBRAL DEFINIDO ->  Generalmente se usa top: 0; , para que el elemento se pegue a la parte superior de su conteenedor al hacer scroll.
-- CONTENEDOR PADRE SIN ALTURA SUFICIENTE -> El elemento sticky se limitará al área visible de ese contenedor con overflow.
 (siempre en el elemnto PADRE o ANCESTRO "de la clase que se hereda"). Otras caracteristicas en la propiedad overfolw como: Hidden, Scroll o auto, tenerlas encuenta. (ya que pueden modificar su utilidad)
-- Z-INDEX -> (cuidado superposiciones de otros elementos)


Ahi estilos por defecto en el reset que hay que incluir ademas del margin padding y box-sizing existen algunos estilos
que los toman por herencia causando problemas al desarrollador cuando personaliza estos a su gusto.

div[class*="card"] { -----> Lo que contenga card en su nombre... le atribuira los estilos determiandos
} (aunque no lo haya usado podia haber sido una posibilidad aunque con BEM se usa poco es util conocerlo)

NOMENCLATURAS PARA LA ESTRUCTURA WEB:
    PREGUNTAS POR RESOLVER:
        Pregunta 1: Teniendo una estructura en style.css y otra diferente en stile-contacto.css , como manejamos las declaraciones para que
        la estructura de nuestro Header no se mueva? se cuenta como un contenedor directo que engloba todo oviando la estructura intterior
        ya que no se toca porque el codigo embevido de un archivo externo esta solidificado en el archivo externo y no deben tenerse en 
        cuenta dentro del nuevo css, ya que este debe estar bien construido alli? 

        - Segun lo que he leido aunque importes, la formacion sigue siendo en cascada , por tanto si tenemos un header cargado en la primera hoja de estilo importada
        cuando llegue a la segunda hoja de estilo y tenga un header, sera sobreescrito por la estructura del ultimo estilo tomado con la misma
        clase. Ya que la identificacion del bloque de texto surge en cascada y es identificada por 2da vez (esto puede generar conflictos CUIDADO).
        - 

        Pregunta 2: Cuando tenemos 1 global pero queremos unir los etilos los .css especificos, si tienen el global ciertas card
        que sacar pero estan en medio de la estructura y lo que nosotros queremos , solo es la parte del footer y el header, que deberiamos 
        de generar otro aarchivo que pusiera style-especificos, o como podriamos usar solo una parte del codigo ya sea para una carta un minimo carrusel 
        para dar modularidad que queremos a nuestro codigo y usar bloques de declaraciones (que usan HTML, CSS y JS), de forma rapida y segura. Y como 
        tocariamos el HTML , que podrian tener esas card, diferente info e imagenes? 



Para crear una web debes tener una raiz precida de archivos. Debes tener claro ciertas preguntas:
1- Puedo tener 2 archivos style.css ? -> NO, generariamos conflicto, por tanto deberiamos tener:

    CSS/
    (dentro de esta)
        global.css o style.css- se le suele llamar para cuando tienes varios estilos generales que vuelves a acomodar en otras web
            - A. Ya sean card
            - B. El header footer o aside, reutilizado en muchas ocasiones (cuando se trabaja con servidores funciona diferente)
            - C. Los estilos para un Carrusel tambien pueden ser reutilizados, si lo creemos conveniente. 
        css/style-galeria.css
            - A. Estilos especificos de la propia galeria
        css/style-contacto.css
            - A. Estilos especiificos del contacto.

2- Recuerda ajustar las rutas:
    Cierto es que por mas que nosotros queramos la profundad de la web va cambiando, como una matrioshka, pero deberiamos
    acomodarla nosotros al contexto segun nos interese. Las profundiades de las webs hoy en dia intentan ser lo menor posible
    asi que LANDPAGES o con 1 nivel de profundidad sera lo mas cotidiano y usado.

3- Al principio, pensaremos que es mas lento pues hay que acostumbrarse, pero cuando veas que ganas en:
    - Claridad, Organizacion, Rendimiento y Mantenibilidad, lo seguiras al dedillo. 


JS
INTRODUCCION
El manejo del DOM es vital para este proyecto tambien utilizaremos muchos metodos desconocidos antes. Una vez vayamos usandolos, iremos aplicando explicaciones exaustivas, aunque,
intentaremos centrarnos en esto y no tanto en el uso de la logica mas que para lo necesario ya que igual usar todo junto se complica.
- (vital) DOMContentLoaded, es importante anadirlo a todos nuestros archivos mientras manipulemos el DOM (el 99,9% lo haremos)

NOVEDADES:
1- Usaremos el DOM para manipular los estilos desde este por si queremos que se oculten o no.
2- Posibles addEventListener:
    - click (se usa para cualquier llamada de accion)
    - 
    -
    -
    -

CARRUSEL
NO ES MUCHO MAS DISTINTO AL CONTEXTO DE UN ARRAY
1. ANADIMOS 2 BOTONES PARA MOVER ITEMS DERECHA O IZQUIERDA (nextBtn y prevBtn) las formulas pueden encontrarse por todas partes ... pero es 1 posicion - 1 posicion y el % del totalSlides;
2. translateX haciendo con un iteral , referencia a nuestro indice multiplicando por el total es decir 100% que es lo que queremos que se mueva... 
3. (faltaria) hay que acicalarlo un poco mas...


ATAJOS CONOCIDOS POR EL CAMINO PARA VISUAL CODE

Una vez el codigo se ha vuelto un poco mosntruoso viene bien saber como sacar y esconder los intervalos.

1. CONTROL DE LAS ETIQUETAS
- CONTROL K + CONTROL + 0 => CONTRAER INTERVALO (CONTRAER ETIQUETAS).
- CONTROL K +  CONTROL + J => EXPANDIR RANGO (EXPANDIR ETIQUETAS).


COSAS QUE DEBERIA SOLUCIONAR
- HEAD y HEAD => deberia enviarlo a las demas web con un @import pero... me puedo pillar los deos poco tiempo.
- ANADIR UN MENU HAMBURGUESA PODIA SER EFECTIVO PARA DISPOSITIVOS MAS PEQUENOS
- ANADIR SCROLL ANIMADO PARA SABER POR DONDE VAMOS
- DARLE CALIDAD A CARRUSEL MAIN, Y EL DE SERVICIOS ECHARLE UN OJO (LE FALTAN EL INDICADOR DE MOVIMIENTO EN LOS SLIDES)
- EL DESPLEGABLE DE PRODUCTOS TIENE UN ERROR , DESAPARECE EL BOTON (TENGO QUE MIRARLO)

