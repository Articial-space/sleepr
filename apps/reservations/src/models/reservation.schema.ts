import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
    @Prop()
    timeStamp: Date
    @Prop()
    startDate: Date
    @Prop()
    endDate: Date
    @Prop()
    userId: String
    @Prop()
    placeId: String
    @Prop()
    invoiceId: String
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument)
