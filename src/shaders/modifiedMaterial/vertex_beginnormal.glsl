#include <beginnormal_vertex>

float angle = (position.y + uTime) * uTwistFrequency;
mat2 rotateMatrix = get2dRotateMatrix(angle);

objectNormal.xz = rotateMatrix * objectNormal.xz;
