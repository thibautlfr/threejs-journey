# Compute Normals dans le Vertex Shader

## Le problème : pourquoi c'est toujours vert ?

Un `PlaneGeometry` est un plan plat. Toutes ses normales pointent dans la même direction : **vers le haut**, soit `vec3(0.0, 1.0, 0.0)`.

Quand on utilise la normale comme couleur dans le fragment shader (`gl_FragColor = vec4(normal, 1.0)`), les composantes xyz sont interprétées comme RGB :

| Composante | Axe | Canal couleur | Valeur |
|------------|-----|---------------|--------|
| x          | →   | Rouge         | 0.0    |
| y          | ↑   | Vert          | 1.0    |
| z          | ↗   | Bleu          | 0.0    |

Résultat : **vert pur partout**, peu importe la forme des vagues.

## Pourquoi les normales ne se mettent pas à jour ?

Dans le vertex shader, on déplace les vertices vers le haut avec `modelPosition.y += elevation`. Mais les **normales** sont un attribut séparé du mesh — elles ont été calculées une seule fois par Three.js à la création de la géométrie, quand le plan était encore plat.

Le GPU ne recalcule pas les normales automatiquement après un déplacement. Il faut le faire manuellement.

## La solution : recalculer les normales

### Principe

Pour connaître l'orientation d'une surface en un point, on a besoin de deux vecteurs tangents à cette surface. Leur **produit vectoriel** (cross product) donne un vecteur perpendiculaire : la normale.

```
        B
        |
        |
        P ——— A
```

- **P** : le vertex actuel
- **A** : un point voisin décalé sur l'axe X
- **B** : un point voisin décalé sur l'axe Z (négatif)

### Étape 1 : créer les points voisins

```glsl
float shift = 0.01;
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
vec3 modelPositionA = modelPosition.xyz + vec3(shift, 0.0, 0.0);
vec3 modelPositionB = modelPosition.xyz + vec3(0.0, 0.0, -shift);
```

On crée deux points très proches du vertex actuel :
- **A** est décalé de 0.01 sur l'axe X
- **B** est décalé de 0.01 sur l'axe Z négatif

Le `shift` doit être petit pour que l'approximation soit précise, mais pas trop pour éviter des artefacts numériques.

### Étape 2 : appliquer l'élévation aux trois points

```glsl
float elevation = waveElevation(modelPosition.xyz);
modelPosition.y += elevation;
modelPositionA.y += waveElevation(modelPositionA);
modelPositionB.y += waveElevation(modelPositionB);
```

On applique la **même fonction** `waveElevation` aux trois points. Chacun sera déplacé différemment selon sa position sur la vague :

```
Avant (plan plat) :          Après (avec élévation) :

B · · · · ·                  B
·           ·                 \
·     P · · A                  \
                                P · ·
                                       · A
```

### Étape 3 : calculer les vecteurs tangents

```glsl
vec3 toA = normalize(modelPositionA - modelPosition.xyz);
vec3 toB = normalize(modelPositionB - modelPosition.xyz);
```

On obtient deux vecteurs qui "longent" la surface de la vague au point P :
- `toA` : direction de P vers A (tangent sur X)
- `toB` : direction de P vers B (tangent sur Z)

On les normalise pour que le cross product donne un vecteur unitaire.

### Étape 4 : le cross product

```glsl
vec3 computedNormal = cross(toA, toB);
```

Le **cross product** de deux vecteurs donne un vecteur **perpendiculaire** aux deux.

```
        normal (↑)
          |
          |
    toB ← P → toA
```

**L'ordre compte.** `cross(toA, toB)` et `cross(toB, toA)` donnent des vecteurs **opposés** (règle de la main droite). Si on inverse l'ordre, la normale pointe vers le bas au lieu du haut, et l'éclairage est complètement faux.

Pour vérifier : sur un plan plat, `cross(toA, toB)` avec A sur +X et B sur -Z doit donner `(0, 1, 0)` (vers le haut). Si on obtient `(0, -1, 0)`, l'ordre est inversé.

## Résultat

Maintenant chaque vertex a une normale qui reflète la pente locale de la vague. Quand on visualise avec `gl_FragColor = vec4(normal, 1.0)` :

- Les faces orientées vers le haut → vert (y dominant)
- Les faces inclinées vers la droite → rouge (x positif)
- Les faces inclinées vers la caméra → bleu (z positif)
- **Un dégradé** de couleurs apparaît au lieu du vert uniforme

Et surtout, ces normales permettent aux fonctions d'éclairage (`directionalLight`, `pointLight`) de calculer correctement la lumière : les faces orientées vers la lumière sont éclairées, celles qui lui tournent le dos sont dans l'ombre.

## Optimisation : supprimer les anciens attributs

Puisqu'on recalcule les normales dans le shader et qu'on n'utilise pas les UVs, on peut les supprimer de la géométrie pour économiser de la mémoire GPU :

```js
waterGeometry.deleteAttribute('normal');
waterGeometry.deleteAttribute('uv');
```
