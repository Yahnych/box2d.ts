/*
 * Copyright (c) 2013 Google, Inc.
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */
System.register(["@box2d", "@testbed"], function (exports_1, context_1) {
    "use strict";
    var b2, testbed, DrawingParticles, testIndex;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (b2_1) {
                b2 = b2_1;
            },
            function (testbed_1) {
                testbed = testbed_1;
            }
        ],
        execute: function () {
            DrawingParticles = class DrawingParticles extends testbed.Test {
                constructor() {
                    super();
                    this.m_drawing = true;
                    this.m_particleFlags = 0;
                    this.m_groupFlags = 0;
                    this.m_colorIndex = 0;
                    {
                        const bd = new b2.BodyDef();
                        const ground = this.m_world.CreateBody(bd);
                        {
                            const shape = new b2.PolygonShape();
                            const vertices = [
                                new b2.Vec2(-4, -2),
                                new b2.Vec2(4, -2),
                                new b2.Vec2(4, 0),
                                new b2.Vec2(-4, 0),
                            ];
                            shape.Set(vertices, 4);
                            ground.CreateFixture(shape, 0.0);
                        }
                        {
                            const shape = new b2.PolygonShape();
                            const vertices = [
                                new b2.Vec2(-4, -2),
                                new b2.Vec2(-2, -2),
                                new b2.Vec2(-2, 6),
                                new b2.Vec2(-4, 6),
                            ];
                            shape.Set(vertices, 4);
                            ground.CreateFixture(shape, 0.0);
                        }
                        {
                            const shape = new b2.PolygonShape();
                            const vertices = [
                                new b2.Vec2(2, -2),
                                new b2.Vec2(4, -2),
                                new b2.Vec2(4, 6),
                                new b2.Vec2(2, 6),
                            ];
                            shape.Set(vertices, 4);
                            ground.CreateFixture(shape, 0.0);
                        }
                        {
                            const shape = new b2.PolygonShape();
                            const vertices = [
                                new b2.Vec2(-4, 4),
                                new b2.Vec2(4, 4),
                                new b2.Vec2(4, 6),
                                new b2.Vec2(-4, 6),
                            ];
                            shape.Set(vertices, 4);
                            ground.CreateFixture(shape, 0.0);
                        }
                    }
                    this.m_colorIndex = 0;
                    this.m_particleSystem.SetRadius(0.05 * 2);
                    this.m_lastGroup = null;
                    this.m_drawing = true;
                    // DEBUG: b2.Assert((DrawingParticles.k_paramDef[0].CalculateValueMask() & DrawingParticles.Parameters.e_parameterBegin) === 0);
                    testbed.Test.SetParticleParameters(DrawingParticles.k_paramDef, DrawingParticles.k_paramDefCount);
                    testbed.Test.SetRestartOnParticleParameterChange(false);
                    this.m_particleFlags = testbed.Test.GetParticleParameterValue();
                    this.m_groupFlags = 0;
                }
                // Determine the current particle parameter from the drawing state and
                // group flags.
                DetermineParticleParameter() {
                    if (this.m_drawing) {
                        if (this.m_groupFlags === (b2.ParticleGroupFlag.b2_rigidParticleGroup | b2.ParticleGroupFlag.b2_solidParticleGroup)) {
                            return DrawingParticles.Parameters.e_parameterRigid;
                        }
                        if (this.m_groupFlags === b2.ParticleGroupFlag.b2_rigidParticleGroup && this.m_particleFlags === b2.ParticleFlag.b2_barrierParticle) {
                            return DrawingParticles.Parameters.e_parameterRigidBarrier;
                        }
                        if (this.m_particleFlags === (b2.ParticleFlag.b2_elasticParticle | b2.ParticleFlag.b2_barrierParticle)) {
                            return DrawingParticles.Parameters.e_parameterElasticBarrier;
                        }
                        if (this.m_particleFlags === (b2.ParticleFlag.b2_springParticle | b2.ParticleFlag.b2_barrierParticle)) {
                            return DrawingParticles.Parameters.e_parameterSpringBarrier;
                        }
                        if (this.m_particleFlags === (b2.ParticleFlag.b2_wallParticle | b2.ParticleFlag.b2_repulsiveParticle)) {
                            return DrawingParticles.Parameters.e_parameterRepulsive;
                        }
                        return this.m_particleFlags;
                    }
                    return DrawingParticles.Parameters.e_parameterMove;
                }
                Keyboard(key) {
                    this.m_drawing = key !== "x";
                    this.m_particleFlags = 0;
                    this.m_groupFlags = 0;
                    switch (key) {
                        case "e":
                            this.m_particleFlags = b2.ParticleFlag.b2_elasticParticle;
                            this.m_groupFlags = b2.ParticleGroupFlag.b2_solidParticleGroup;
                            break;
                        case "p":
                            this.m_particleFlags = b2.ParticleFlag.b2_powderParticle;
                            break;
                        case "r":
                            this.m_groupFlags = b2.ParticleGroupFlag.b2_rigidParticleGroup | b2.ParticleGroupFlag.b2_solidParticleGroup;
                            break;
                        case "s":
                            this.m_particleFlags = b2.ParticleFlag.b2_springParticle;
                            this.m_groupFlags = b2.ParticleGroupFlag.b2_solidParticleGroup;
                            break;
                        case "t":
                            this.m_particleFlags = b2.ParticleFlag.b2_tensileParticle;
                            break;
                        case "v":
                            this.m_particleFlags = b2.ParticleFlag.b2_viscousParticle;
                            break;
                        case "w":
                            this.m_particleFlags = b2.ParticleFlag.b2_wallParticle;
                            this.m_groupFlags = b2.ParticleGroupFlag.b2_solidParticleGroup;
                            break;
                        case "b":
                            this.m_particleFlags = b2.ParticleFlag.b2_barrierParticle | b2.ParticleFlag.b2_wallParticle;
                            break;
                        case "h":
                            this.m_particleFlags = b2.ParticleFlag.b2_barrierParticle;
                            this.m_groupFlags = b2.ParticleGroupFlag.b2_rigidParticleGroup;
                            break;
                        case "n":
                            this.m_particleFlags = b2.ParticleFlag.b2_barrierParticle | b2.ParticleFlag.b2_elasticParticle;
                            this.m_groupFlags = b2.ParticleGroupFlag.b2_solidParticleGroup;
                            break;
                        case "m":
                            this.m_particleFlags = b2.ParticleFlag.b2_barrierParticle | b2.ParticleFlag.b2_springParticle;
                            this.m_groupFlags = b2.ParticleGroupFlag.b2_solidParticleGroup;
                            break;
                        case "f":
                            this.m_particleFlags = b2.ParticleFlag.b2_wallParticle | b2.ParticleFlag.b2_repulsiveParticle;
                            break;
                        case "c":
                            this.m_particleFlags = b2.ParticleFlag.b2_colorMixingParticle;
                            break;
                        case "z":
                            this.m_particleFlags = b2.ParticleFlag.b2_zombieParticle;
                            break;
                        default:
                            break;
                    }
                    testbed.Test.SetParticleParameterValue(this.DetermineParticleParameter());
                }
                MouseMove(p) {
                    super.MouseMove(p);
                    if (this.m_drawing) {
                        const shape = new b2.CircleShape();
                        shape.m_p.Copy(p);
                        shape.m_radius = 0.2;
                        ///  b2Transform xf;
                        ///  xf.SetIdentity();
                        const xf = b2.Transform.IDENTITY;
                        this.m_particleSystem.DestroyParticlesInShape(shape, xf);
                        const joinGroup = this.m_lastGroup && this.m_groupFlags === this.m_lastGroup.GetGroupFlags();
                        if (!joinGroup) {
                            this.m_colorIndex = (this.m_colorIndex + 1) % testbed.Test.k_ParticleColorsCount;
                        }
                        const pd = new b2.ParticleGroupDef();
                        pd.shape = shape;
                        pd.flags = this.m_particleFlags;
                        if ((this.m_particleFlags & (b2.ParticleFlag.b2_wallParticle | b2.ParticleFlag.b2_springParticle | b2.ParticleFlag.b2_elasticParticle)) ||
                            (this.m_particleFlags === (b2.ParticleFlag.b2_wallParticle | b2.ParticleFlag.b2_barrierParticle))) {
                            pd.flags |= b2.ParticleFlag.b2_reactiveParticle;
                        }
                        pd.groupFlags = this.m_groupFlags;
                        pd.color.Copy(testbed.Test.k_ParticleColors[this.m_colorIndex]);
                        pd.group = this.m_lastGroup;
                        this.m_lastGroup = this.m_particleSystem.CreateParticleGroup(pd);
                        this.m_mouseTracing = false;
                    }
                }
                MouseUp(p) {
                    super.MouseUp(p);
                    this.m_lastGroup = null;
                }
                ParticleGroupDestroyed(group) {
                    super.ParticleGroupDestroyed(group);
                    if (group === this.m_lastGroup) {
                        this.m_lastGroup = null;
                    }
                }
                SplitParticleGroups() {
                    for (let group = this.m_particleSystem.GetParticleGroupList(); group; group = group.GetNext()) {
                        if (group !== this.m_lastGroup &&
                            (group.GetGroupFlags() & b2.ParticleGroupFlag.b2_rigidParticleGroup) &&
                            (group.GetAllParticleFlags() & b2.ParticleFlag.b2_zombieParticle)) {
                            // Split a rigid particle group which may be disconnected
                            // by destroying particles.
                            this.m_particleSystem.SplitParticleGroup(group);
                        }
                    }
                }
                Step(settings) {
                    const parameterValue = testbed.Test.GetParticleParameterValue();
                    this.m_drawing = (parameterValue & DrawingParticles.Parameters.e_parameterMove) !== DrawingParticles.Parameters.e_parameterMove;
                    if (this.m_drawing) {
                        switch (parameterValue) {
                            case b2.ParticleFlag.b2_elasticParticle:
                            case b2.ParticleFlag.b2_springParticle:
                            case b2.ParticleFlag.b2_wallParticle:
                                this.m_particleFlags = parameterValue;
                                this.m_groupFlags = b2.ParticleGroupFlag.b2_solidParticleGroup;
                                break;
                            case DrawingParticles.Parameters.e_parameterRigid:
                                // b2_waterParticle is the default particle type in
                                // LiquidFun.
                                this.m_particleFlags = b2.ParticleFlag.b2_waterParticle;
                                this.m_groupFlags = b2.ParticleGroupFlag.b2_rigidParticleGroup | b2.ParticleGroupFlag.b2_solidParticleGroup;
                                break;
                            case DrawingParticles.Parameters.e_parameterRigidBarrier:
                                this.m_particleFlags = b2.ParticleFlag.b2_barrierParticle;
                                this.m_groupFlags = b2.ParticleGroupFlag.b2_rigidParticleGroup;
                                break;
                            case DrawingParticles.Parameters.e_parameterElasticBarrier:
                                this.m_particleFlags = b2.ParticleFlag.b2_barrierParticle | b2.ParticleFlag.b2_elasticParticle;
                                this.m_groupFlags = 0;
                                break;
                            case DrawingParticles.Parameters.e_parameterSpringBarrier:
                                this.m_particleFlags = b2.ParticleFlag.b2_barrierParticle | b2.ParticleFlag.b2_springParticle;
                                this.m_groupFlags = 0;
                                break;
                            case DrawingParticles.Parameters.e_parameterRepulsive:
                                this.m_particleFlags = b2.ParticleFlag.b2_repulsiveParticle | b2.ParticleFlag.b2_wallParticle;
                                this.m_groupFlags = b2.ParticleGroupFlag.b2_solidParticleGroup;
                                break;
                            default:
                                this.m_particleFlags = parameterValue;
                                this.m_groupFlags = 0;
                                break;
                        }
                    }
                    if (this.m_particleSystem.GetAllParticleFlags() & b2.ParticleFlag.b2_zombieParticle) {
                        this.SplitParticleGroups();
                    }
                    super.Step(settings);
                    testbed.g_debugDraw.DrawString(5, this.m_textLine, "Keys: (L) liquid, (E) elastic, (S) spring");
                    this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
                    testbed.g_debugDraw.DrawString(5, this.m_textLine, "(R) rigid, (W) wall, (V) viscous, (T) tensile");
                    this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
                    testbed.g_debugDraw.DrawString(5, this.m_textLine, "(F) repulsive wall, (B) wall barrier");
                    this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
                    testbed.g_debugDraw.DrawString(5, this.m_textLine, "(H) rigid barrier, (N) elastic barrier, (M) spring barrier");
                    this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
                    testbed.g_debugDraw.DrawString(5, this.m_textLine, "(C) color mixing, (Z) erase, (X) move");
                    this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
                }
                GetDefaultViewZoom() {
                    return 0.1;
                }
                static Create() {
                    return new DrawingParticles();
                }
            };
            exports_1("DrawingParticles", DrawingParticles);
            /**
             * Set bit 31 to distiguish these values from particle flags.
             */
            DrawingParticles.Parameters = {
                e_parameterBegin: (1 << 31),
                e_parameterMove: (1 << 31) | (1 << 0),
                e_parameterRigid: (1 << 31) | (1 << 1),
                e_parameterRigidBarrier: (1 << 31) | (1 << 2),
                e_parameterElasticBarrier: (1 << 31) | (1 << 3),
                e_parameterSpringBarrier: (1 << 31) | (1 << 4),
                e_parameterRepulsive: (1 << 31) | (1 << 5),
            };
            DrawingParticles.k_paramValues = [
                new testbed.ParticleParameterValue(b2.ParticleFlag.b2_zombieParticle, testbed.ParticleParameter.k_DefaultOptions, "erase"),
                new testbed.ParticleParameterValue(DrawingParticles.Parameters.e_parameterMove, testbed.ParticleParameter.k_DefaultOptions, "move"),
                new testbed.ParticleParameterValue(DrawingParticles.Parameters.e_parameterRigid, testbed.ParticleParameter.k_DefaultOptions, "rigid"),
                new testbed.ParticleParameterValue(DrawingParticles.Parameters.e_parameterRigidBarrier, testbed.ParticleParameter.k_DefaultOptions, "rigid barrier"),
                new testbed.ParticleParameterValue(DrawingParticles.Parameters.e_parameterElasticBarrier, testbed.ParticleParameter.k_DefaultOptions, "elastic barrier"),
                new testbed.ParticleParameterValue(DrawingParticles.Parameters.e_parameterSpringBarrier, testbed.ParticleParameter.k_DefaultOptions, "spring barrier"),
                new testbed.ParticleParameterValue(DrawingParticles.Parameters.e_parameterRepulsive, testbed.ParticleParameter.k_DefaultOptions, "repulsive wall"),
            ];
            DrawingParticles.k_paramDef = [
                new testbed.ParticleParameterDefinition(testbed.ParticleParameter.k_particleTypes),
                new testbed.ParticleParameterDefinition(DrawingParticles.k_paramValues),
            ];
            DrawingParticles.k_paramDefCount = DrawingParticles.k_paramDef.length;
            exports_1("testIndex", testIndex = testbed.RegisterTest("Particles", "Drawing Particles", DrawingParticles.Create));
        }
    };
});
//# sourceMappingURL=drawing_particles.js.map