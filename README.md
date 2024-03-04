# Curso Codesai: code smells and refactoring

## Slides
1. [Introduction](./documentation/slides/1_Introduction.pdf)
2. [Code Smells within classes](documentation/slides/2_Code_Smells_within_classes.pdf)
3. Code Smells between classes
   * [Code Smells between classes part 1](documentation/slides/3a_Code_Smells_between_classes.pdf)
   * [Code Smells between classes part 2](documentation/slides/3b_Code_Smells_between_classes.pdf)
4. Refactorings
   * [Patterns of Refactoring](documentation/slides/4a_Patterns_of_Refactoring.pdf)
   * [Core Refactorings](documentation/slides/4b_Core_Refactorings.pdf)
5. [Good Enough Design](documentation/slides/5_Good_Enough_Design.pdf)
6. [Hexagonal Architecture](documentation/slides/6_Hexagonal_Architecture.pdf)
7. [Workflows and Economics of Refactoring](documentation/slides/7_Workflows_and_Economics_of_Refactoring.pdf)

## Katas
* [Refactoring smelly mars rover](./katas/refactoring-smelly-mars-rover)

## Interesting links
* [Artículo: De taxonomías y catálogos de code smells](https://codesai.com/posts/2022/09/code-smells-taxonomies-and-catalogs)
* [Online Code Smells Catalog](https://luzkan.github.io/smells/)
* [Online catalog of refactorings](https://refactoring.com/catalog/)
* [PDF: A list of symptoms and the associated code smells](documentation/smells-and-their-solutions/wake_symptoms_and_smells.pdf)
* [PDF: A list of code smells and their associated refactorings](documentation/smells-and-their-solutions/wake_smells_to_refactorings.pdf)
* [PDF: Another list of code smells and their associated refactorings](documentation/smells-and-their-solutions/wake_smells_to_refactorings.pdf)
* [Refactoring.Guru: a list of code smells](https://refactoring.guru/refactoring/smells)
* [Refactoring.Guru: a list of refactorings](https://refactoring.guru/refactoring/techniques)

## Thoughts
* Un code smell es un indicador de un potencial problema, no necesariamente un problema.
* Una clase es grande no cuando tiene muchas líneas de código, sino cuando tiene múltiples responsabilidades. Dicho de otra forma, cuando tiene distintos motivos para cambiar.
* A veces hay que colocar juntas aquellas partes del software que cambian juntas. Esto puede ser señal de que comparten la misma responsabilidad.
* Ten en cuenta que cuando hablamos del comportamiento de una clase, debemos obviar lo que ocurre en el constructor. Esto es porque el código que hay en el constructor se ejecuta antes de que exista el objeto de esa instancia. Cuando nos referimos al comportamiento de un objeto, nos referimos al comportamiento que tiene ese objeto una vez está creado.
* Es más probable que cambie el "cómo" lo hacemos que el "qué" hacemos. Por tanto, tiene sentido que cuando escribímos código nos protejamos contra cambios en el "cómo". 
  * Por ejemplo, podemos utilizar polimorfismo para encapsular en distintos objetos distintos comportamientos. Es decir, tiene sentido crear una interfaz que debe ser implementado en un método de pago ya que es altamente probable que más adelante tengamos distintos métodos de pago o estos cambien. Sin embargo, es poco probable que dejemos de necesitar un método de pago. Fíjate que es posible que cambiemos "cómo" se paga, pero improbable que quitemos la necesidad de pagar (el "qué").
  * La mera existencia de las interfaces ya nos ayudan a esto, ya que dictaminan los contratos que se utilizarán para hacer el "qué", pero no especifican el "cómo".
* A menudo es bueno preguntarse: ¿cuántas razones de cambio tiene este código?. Si una función debe ser modificada por dos razones distintas, probablemente estemos haciendo algo mal. 
* Recuerda que dos bloques de código iguales no necesariamente deben de ser transformados a una abstractión para evitar repetir código. Aunque el código sea idéntico, vale la pena hacerse esta pregunta: ¿estos dos bloques de código comparten las mismas razones de cambio? Si la respuesta es no, ahí no hay duplicidad a corregir.
* SOLID: 
  * Single Responsibility Principle => una clase debe tener una única responsabilidad. Otra forma de verlo es, una clase solo debe de tener un eje de cambio. Hay que fijarse en las razones y los ritmos de cambio. Es útil hacerse esta pregunta: "What is the responsibility of your class/component/microservice?". Si la respuesta incluye un "...  y..." es que no estamos cumpliendo el principio.
  * Open/Closed Principle => Una clase/módulo/función debería estar abierto a extensión, pero cerrado a modificación. Una visión moderna de este principio sería utilizar una interfaz dejar que diferentes clases usen polimorfismo usando esa interfaz para realizar sus propósitos. De esta manera, la interfaz dictamina los puntos comunes, pero deja a las implementaciones de la interfaz la posibilidad de extender su propósito. Otra manera de interpretar este principio es "Protected Variations".
  * Liskov Substitution Principle => El principio define que los objetos de una SuperClass serán reemplazables por objetos de sus SubClass sin interrumpir la aplicación. Es decir, todos esos objetos compartirán propiedades y métodos. Además sus métodos aceptarán los mismos parámetros y retornaran lo mismo. De esta manera, podemos intercambiar SubClasses garantizando que no rompemos la aplicación.
  * Interface Segregation Principle => Un cliente no debería de estar forzado a utilizar interfaces que no utilizan. Imagina que tenemos una interfaz que tiene dos métodos definidos: "foo" y "bar". Ahora imagina que tenemos una clase llamada "A" que implementa esa interfaz, pero solo define el método "foo" de la interfaz. En el método "bar" simplemente lanza un error así `new Error('not implemented')` porque la clase "A" no necesita para nada ese método que hay definido en la interfaz. Ahora imagina otra clase llamada "B" que hace lo opuesto, implementa el método "bar" y no termina la implementación de "foo". Pues bien, aquí estas incumpliendo este principio ya que estas tratando de reutilizar una interfaz en distintas clases que no comparten propósito. Probablemente necesites dos interfaces independientes
  ![Interface Segregation Principle](./documentation/images/isp.jpeg)
  * Dependency Inversion Principle => El principio consta de dos conceptos básicos: 
    * los módulos de alto nivel no deberían depender de los módulos de bajo nivel 
    * ambos módulos, los de alto nivel y los de bajo nivel, deberían depender de abstracciones.  

    Es decir, imagina que tienes una clase llamada "A" y otra llamada "B". En el constructor de "A" recibes por argumento un objeto de la clase "B". Estas clases estarían acopladas. Para cumplir con este principio, lo que vamos a hacer es la clase "B" implemente una interfaz, y después modificaremos el constructor de "A" para indicarle que ya no recibe un objeto de clase "B" sino un objeto de la interfaz creada.  
    Esto permite pasar a "A" cualquier objeto que cumpla la interfaz de "B" facilitando, entre otras cosas, el polimorfismo, los dobles de prueba, etc.
* Cuando se usa Arquitectura Hexagonal (ports and adapters) observa que los "acceptance test" testean el "qué" hace la aplicación, pero no el "cómo" lo hace. Sin embargo los test unitarios si se encargan de testear los detalles del "cómo" lo hace.
* En Arquitectura Hexagonal (ports and adapters), un "port" es una abstracción de dominio. Es decir, una interfaz. Por ejemplo "UserRepository". Sin embargo, un "adapter" es una implementación de un puerto. Por ejemplo "MySQLUserRepository". Por tanto, un mismo puerto define un contrato que múltiples adapters implementarán.
* "Extract and override" => técnica que permite hacer un "test double" de un método privado de una clase. Esta técnica consiste en convertir el método privado a "protected". Gracias a eso, en los test podemos hacer una clase anónima que extienda de la clase original para podemos hacer una sobrescritura del método "protected". Esto es muy útil en algunas situaciones. Por ejemplo, cuando en ese método privado estamos haciendo enviando un email y queremos testear que el email se envía. En vez de montar todo lo necesario para comprobar que el email realmente ha llegado a una bandeja de entrada, podemos simplemente hacer un extract and override de ese método para que los test simplemente comprueben que ese método ha sido llamado con los parámetros adecuados.

## Related links
* [Naming as a Process](https://www.digdeeproots.com/articles/on/naming-process/)
* [DRY is about Knowledge. Code duplication is not the issue](https://verraes.net/2014/08/dry-is-about-knowledge/)
* [Aplicación del principio DRY](https://www.eferro.net/2015/05/aplicacion-del-principio-dry.html)
* [Code smells mindmap connected to Jerzyk's catalog](https://www.mindmeister.com/app/map/3025490820?t=nCw69SqYKL) (created by [Daniel Ramos](https://twitter.com/DanielRamosAcos))
* 📺 [Clean Architecture: La mejor forma de escalar y mantener tu código](https://www.youtube.com/watch?v=y3MWfPDmVqo)
* [Dependency Inversion Principle in the wild](https://martinfowler.com/articles/dipInTheWild.html)
* [Tell, Don’t Ask](./documentation/articles/tell_do_not_ask.pdf)
* [Ley de Demeter : No hables con extraños](./documentation/articles/ley-de-demeter.pdf)
* [Arquitectura Hexagonal
  (Traducción al español del patrón "Ports and Adapters", de Alistair Cockburn)](https://jmgarridopaz.github.io/content/arquitecturahexagonal.html)
* [Hexagonal Architecture - What Is It? Why Should You Use It?](https://www.happycoders.eu/software-craftsmanship/hexagonal-architecture/)
* [Ports and Adapters architecture](https://herbertograca.com/2017/09/14/ports-adapters-architecture/)
* [DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
* [Ejemplo de clean architecture que usa ports & adapters (arquitectura hexagonal) para separarse de la infraestructura - Repositorio de código del libro Get Your Hands Dirty on Clean Architecture](https://github.com/thombergs/buckpal)

## A modern classification of code smells
![Code Smells map](documentation/images/code_smells_wake_map.png)

## A modern classification of refactorings
![refactorings map](documentation/images/refactoring_edicion_2.jpeg)

## Bibliografía
* Refactoring Workbook https://xp123.com/articles/refactoring-workbook/ <- en este libro se presenta la clasificación de Code Smells que vimos el primer día.
Tiene muchos ejercicios y relaciona muy bien los code smells con principios de diseño. Los ejemplos son en Java.
* Refactoring: Improving the Design of Existing Code 1st ed. https://www.goodreads.com/book/show/44936.Refactoring <- es la primera edición.
Todos los ejemplos vienen en Java. Incluye refactorings largos que ya no aparecen en la segunda edición.
Algunas mecánicas de refactoring han quedado obsoletas gracias a la potencia de los IDEs actuales (sobre todo en java), pero siguen siendo muy útiles
para otros lenguajes. El nombre de los refactorings se sigue usando en los IDEs.
La discusión de code smells es mejor en el Refactoring Workbook.
* Refactoring: Improving the Design of Existing Code 2nd ed. https://martinfowler.com/articles/refactoring-2nd-ed.html <- Todos los ejemplos son en JavaScript.
Los nombres de muchos refactorings han cambiado para ser más inclusivos con  otras formas de trabajar (lenguajes dinámicos y programación
funcional). El capítulo de smells ha variado un poco, creo que ha mejorado.
El capítulo en que se explica el concepto de refactoring, su implicación económica, las herramientas y los workflows de refactoring ha mejorado
muchísimo gracias a la experiencia acumulada durante un montón de años.
Creo que leería este libro primero, y luego dependiendo del lenguaje que te interese miraría el catálogo de refactorings de la primera edición
que sigue siendo más adecuado para lenguajes como Java o PHP.
* Refactoring to Patterns https://www.goodreads.com/book/show/85041.Refactoring_to_Patterns <- Este libro es muy interesante, pero es avanzado.
Exige conocimiento previo tanto de refactorings como de patrones de diseño.
Trata sobre refactorings de larga duración que te pueden llevar hacia o sacarte de ciertos patrones de diseño.
Estos refactorings largos se componen de sucesiones de mecánicas de refactoring descritas en el libro de Refactoring.
Más adelante recomiendo un libro de patrones de diseño. Los ejemplos están en Java.
* Implementation Patterns https://www.goodreads.com/book/show/781559.Implementation_Patterns <- este libro es como Clean Code pero creo que mejor razonado y con menos dogma. Es la versión Java de un libro que originalmente salió para Smalltalk, pero los principios y patrones que explican puede aportar muchísimo a cualquier programador.
* Agile Principles, Patterns, and Practices in C# https://www.goodreads.com/book/show/84983.Agile_Principles_Patterns_and_Practices_in_C_
<- la mejor explicación de SOLID y de los principios de gestión de dependencias entre paquetes que he visto. De cuando el autor no había caído aún en el dogmatismo. Los ejemplos están en C#, pero aporta mucho a cualquier lenguaje.
* Principles of Package Design https://matthiasnoback.nl/book/principles-of-package-design/
Complementa a Agile Principles, Patterns, and Practices in C# porque incluye un montón de ejemplos que ayudan a profundizar más en SOLID y en los principios de gestión de depedencias entre paquetes. Los ejemplos están en PHP.
* Practical Object-Oriented Design: An Agile Primer Using Ruby, 2nd Edition https://www.pearson.com/us/higher-education/program/Metz-Practical-Object-Oriented-Design-An-Agile-Primer-Using-Ruby-2nd-Edition/PGM334639.html <- una gran exposición de la OO desde la filosofía de modelar comportamientos y responsabilidades. Ojalá se usase en la enseñanza de OO. De hecho aún mejor como introducción, antes de leer este, sería:
* Java OOP Done Right https://www.goodreads.com/book/show/57982539-java-oop-done-right
* Head First Design Patterns https://www.oreilly.com/library/view/head-first-design/0596007124/ <- los patrones más usados explicados de una manera muy didáctica.
El libro es realmente bueno y trata las ideas con mucha profundidad. Al mismo tiempo consiguen hacerlo entretenido. ¡Toda una hazaña!
* Working Effectively with Legacy Code
https://www.oreilly.com/library/view/working-effectively-with/0131177052/
Este libro está muy bien para aprender técnicas que te permitan introducir tests en código legacy poco o no testable, y a partir de ahí poder empezar a refactorizarlo. También te ayuda a que te des cuenta de cómo hacer tu código más testable.
* Five Lines of Code
https://www.manning.com/books/five-lines-of-code
Es un libro reciente sobre refactoring. Su punto de vista es usar reglas en vez de code smells para detectar qué debes refactorizar. Todos los ejemplos están en TypeScript.
También es muy interesante que enseña mecánicas de refactoring basadas en aprovechar las utilidades del compilador (de TypeScript), no sólo en tener tests.
Contiene ideas muy buenas sobre refactorings grandes y economía del refactoring.
* Refactoring at Scale
https://www.oreilly.com/library/view/refactoring-at-scale/9781492075523/
Es un libro reciente sobre refactoring. Trata de refactorings largos que afectan a gran parte de la empresa. No se mete mucho en prácticas técnicas concretas a utilizar.
Lo que creo que está muy bien es lo que explican sobre detección, métricas, planificación, estimación, venta a producto, comunicación y seguimiento del refactoring.
* The Programmer's Brain
https://www.manning.com/books/the-programmers-brain
Muy interesante para entender cómo los code smells afectan a nuestra productividad a la hora de desarrollar. 