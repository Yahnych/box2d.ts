/*
* Copyright (c) 2006-2012 Erin Catto http://www.box2d.org
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
System.register(["@box2d", "../testbed.js"], function (exports_1, context_1) {
    "use strict";
    var b2, testbed, Pinball;
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
            /**
             * This tests bullet collision and provides an example of a
             * gameplay scenario. This also uses a loop shape.
             */
            Pinball = class Pinball extends testbed.Test {
                constructor() {
                    super();
                    this.m_button = false;
                    // Ground body
                    /*b2.Body*/
                    let ground = null;
                    {
                        /*b2.BodyDef*/
                        const bd = new b2.BodyDef();
                        ground = this.m_world.CreateBody(bd);
                        /*b2.Vec2*/
                        const vs = b2.Vec2.MakeArray(5);
                        vs[0].Set(-8.0, 6.0);
                        vs[1].Set(-8.0, 20.0);
                        vs[2].Set(8.0, 20.0);
                        vs[3].Set(8.0, 6.0);
                        vs[4].Set(0.0, -2.0);
                        /*b2.ChainShape*/
                        const loop = new b2.ChainShape();
                        loop.CreateLoop(vs, 5);
                        /*b2.FixtureDef*/
                        const fd = new b2.FixtureDef();
                        fd.shape = loop;
                        fd.density = 0.0;
                        ground.CreateFixture(fd);
                    }
                    // Flippers
                    {
                        /*b2.Vec2*/
                        const p1 = new b2.Vec2(-2.0, 0.0), p2 = new b2.Vec2(2.0, 0.0);
                        /*b2.BodyDef*/
                        const bd = new b2.BodyDef();
                        bd.type = b2.BodyType.b2_dynamicBody;
                        bd.position.Copy(p1);
                        /*b2.Body*/
                        const leftFlipper = this.m_world.CreateBody(bd);
                        bd.position.Copy(p2);
                        /*b2.Body*/
                        const rightFlipper = this.m_world.CreateBody(bd);
                        /*b2.PolygonShape*/
                        const box = new b2.PolygonShape();
                        box.SetAsBox(1.75, 0.1);
                        /*b2.FixtureDef*/
                        const fd = new b2.FixtureDef();
                        fd.shape = box;
                        fd.density = 1.0;
                        leftFlipper.CreateFixture(fd);
                        rightFlipper.CreateFixture(fd);
                        /*b2.RevoluteJointDef*/
                        const jd = new b2.RevoluteJointDef();
                        jd.bodyA = ground;
                        jd.localAnchorB.SetZero();
                        jd.enableMotor = true;
                        jd.maxMotorTorque = 1000.0;
                        jd.enableLimit = true;
                        jd.motorSpeed = 0.0;
                        jd.localAnchorA.Copy(p1);
                        jd.bodyB = leftFlipper;
                        jd.lowerAngle = -30.0 * b2.pi / 180.0;
                        jd.upperAngle = 5.0 * b2.pi / 180.0;
                        this.m_leftJoint = this.m_world.CreateJoint(jd);
                        jd.motorSpeed = 0.0;
                        jd.localAnchorA.Copy(p2);
                        jd.bodyB = rightFlipper;
                        jd.lowerAngle = -5.0 * b2.pi / 180.0;
                        jd.upperAngle = 30.0 * b2.pi / 180.0;
                        this.m_rightJoint = this.m_world.CreateJoint(jd);
                    }
                    // Circle character
                    {
                        /*b2.BodyDef*/
                        const bd = new b2.BodyDef();
                        bd.position.Set(1.0, 15.0);
                        bd.type = b2.BodyType.b2_dynamicBody;
                        bd.bullet = true;
                        this.m_ball = this.m_world.CreateBody(bd);
                        /*b2.CircleShape*/
                        const shape = new b2.CircleShape();
                        shape.m_radius = 0.2;
                        /*b2.FixtureDef*/
                        const fd = new b2.FixtureDef();
                        fd.shape = shape;
                        fd.density = 1.0;
                        this.m_ball.CreateFixture(fd);
                    }
                    this.m_button = false;
                }
                Keyboard(key) {
                    switch (key) {
                        case "a":
                            this.m_button = true;
                            break;
                    }
                }
                KeyboardUp(key) {
                    switch (key) {
                        case "a":
                            this.m_button = false;
                            break;
                    }
                }
                Step(settings) {
                    if (this.m_button) {
                        this.m_leftJoint.SetMotorSpeed(20.0);
                        this.m_rightJoint.SetMotorSpeed(-20.0);
                    }
                    else {
                        this.m_leftJoint.SetMotorSpeed(-10.0);
                        this.m_rightJoint.SetMotorSpeed(10.0);
                    }
                    super.Step(settings);
                    testbed.g_debugDraw.DrawString(5, this.m_textLine, "Press 'a' to control the flippers");
                    this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
                }
                static Create() {
                    return new Pinball();
                }
            };
            exports_1("Pinball", Pinball);
        }
    };
});
//# sourceMappingURL=pinball.js.map