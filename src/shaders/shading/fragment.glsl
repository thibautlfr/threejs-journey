uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl
#include ../includes/pointLight.glsl

void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = uColor;

    // Lights
    vec3 light = vec3(0.0);

    light += ambientLight(
            vec3(1.0),  // light color
            0.03 // light intensity
    );

    light += directionalLight(
            vec3(0.1, 0.1, 1.0),  // light color
            1.0, // light intensity
            normal, // normal (face direction)
            vec3(0.0, 0.0, 3.0), // light Position
            viewDirection, // view direction
            20.0 // specular power
    );

    light += pointLight(
            vec3(1.0, 0.1, 0.1),  // light color
            1.0, // light intensity
            normal, // normal (face direction)
            vec3(0.0, 2.5, 0.0), // light Position
            viewDirection, // view direction
            20.0, // specular power
            vPosition, // fragment position
            0.25 // light decay
    );

    light += pointLight(
            vec3(0.1, 1.0, 0.5),  // light color
            1.0, // light intensity
            normal, // normal (face direction)
            vec3(2.0, 2.0, 2.0), // light Position
            viewDirection, // view direction
            20.0, // specular power
            vPosition, // fragment position
            0.2 // light decay
    );

    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}