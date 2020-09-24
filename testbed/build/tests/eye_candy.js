// #if B2_ENABLE_PARTICLE
System.register(["@box2d", "../testbed.js"], function (exports_1, context_1) {
    "use strict";
    var b2, testbed, EyeCandy;
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
            EyeCandy = class EyeCandy extends testbed.Test {
                constructor() {
                    super();
                    this.m_particleSystem.SetDamping(0.2);
                    this.m_particleSystem.SetRadius(0.3 * 2);
                    this.m_particleSystem.SetGravityScale(0.4);
                    this.m_particleSystem.SetDensity(1.2);
                    const bdg = new b2.BodyDef();
                    const ground = this.m_world.CreateBody(bdg);
                    const bd = new b2.BodyDef();
                    bd.type = b2.BodyType.b2_staticBody; //b2.BodyType.b2_dynamicBody;
                    bd.allowSleep = false;
                    bd.position.Set(0.0, 0.0);
                    const body = this.m_world.CreateBody(bd);
                    const shape = new b2.PolygonShape();
                    shape.SetAsBox(0.5, 10.0, new b2.Vec2(20.0, 0.0), 0.0);
                    body.CreateFixture(shape, 5.0);
                    shape.SetAsBox(0.5, 10.0, new b2.Vec2(-20.0, 0.0), 0.0);
                    body.CreateFixture(shape, 5.0);
                    shape.SetAsBox(0.5, 20.0, new b2.Vec2(0.0, 10.0), Math.PI / 2.0);
                    body.CreateFixture(shape, 5.0);
                    shape.SetAsBox(0.5, 20.0, new b2.Vec2(0.0, -10.0), Math.PI / 2.0);
                    body.CreateFixture(shape, 5.0);
                    bd.type = b2.BodyType.b2_dynamicBody;
                    bd.position.Set(0.0, 0.0);
                    this.m_mover = this.m_world.CreateBody(bd);
                    shape.SetAsBox(1.0, 5.0, new b2.Vec2(0.0, 2.0), 0.0);
                    this.m_mover.CreateFixture(shape, 5.0);
                    const jd = new b2.RevoluteJointDef();
                    jd.bodyA = ground;
                    jd.bodyB = this.m_mover;
                    jd.localAnchorA.Set(0.0, 0.0);
                    jd.localAnchorB.Set(0.0, 5.0);
                    jd.referenceAngle = 0.0;
                    jd.motorSpeed = 0;
                    jd.maxMotorTorque = 1e7;
                    jd.enableMotor = true;
                    this.m_joint = this.m_world.CreateJoint(jd);
                    const pd = new b2.ParticleGroupDef();
                    pd.flags = b2.ParticleFlag.b2_waterParticle;
                    const shape2 = new b2.PolygonShape();
                    shape2.SetAsBox(9.0, 9.0, new b2.Vec2(0.0, 0.0), 0.0);
                    pd.shape = shape2;
                    this.m_particleSystem.CreateParticleGroup(pd);
                }
                Step(settings) {
                    const time = new Date().getTime();
                    this.m_joint.SetMotorSpeed(0.7 * Math.cos(time / 1000));
                    super.Step(settings);
                }
                static Create() {
                    return new EyeCandy();
                }
            };
            exports_1("EyeCandy", EyeCandy);
        }
    };
});
//# sourceMappingURL=eye_candy.js.map