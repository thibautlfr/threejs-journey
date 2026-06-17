#include <begin_vertex>

float angle = (position.y + uTime) * uTwistFrequency;
mat2 rotateMatrix = get2dRotateMatrix(angle);

transformed.xz = rotateMatrix * transformed.xz;
